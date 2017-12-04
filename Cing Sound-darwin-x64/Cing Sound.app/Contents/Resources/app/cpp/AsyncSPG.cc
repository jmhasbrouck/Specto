#include <string>
#include <iostream>
#include <nan.h>
#include "Spectrogram.h"

using namespace Nan;  // NOLINT(build/namespaces)

class BufferWorker : public AsyncWorker {
 public:
  BufferWorker(
          Callback *callback
	  , std::string filename
	  ,size_t height
	  ,size_t width
	  ,double minDb
	  ,v8::Local<v8::ArrayBufferView>& data
      )
    : AsyncWorker(callback), spg(filename), bufferview(v8::Isolate::GetCurrent(), data) {
    std::cout <<"called constructor" << std::endl;
    this->height = height;
    this->width = width;
    this->minDb = minDb;
    this->data = (char*)(data->Buffer()->GetContents().Data());
    if (this->data == 0) {
      std::cout << "data was null!\n" << std::endl;
    }
  }
  
  ~BufferWorker() {
    //delete[] this->data;
  }
  
  void Execute () {
    std::cout <<"called execute" <<std::endl;
    spg.getData(data, height, width, minDb);
  }

  void HandleOKCallback () {
    v8::Local<v8::Value> argv[] = {Nan::Null()};
    callback->Call(1, argv);
  }

 private:
  Spectrogram spg;
  size_t height;
  size_t width;
  double minDb;
  char* data;
  v8::Persistent<v8::Object> bufferview;
};

NAN_METHOD(GetData) {
  v8::String::Utf8Value str(info[0]->ToString());
  std::string filename = std::string(*str);
  std::cout << filename << std::endl;
  size_t width = To<int>(info[1]).FromJust();
  std::cout << width << std::endl;
  size_t height = To<int>(info[2]).FromJust();
  double minDb = To<double>(info[3]).FromJust();
  v8::Local<v8::Value> bufferview = info[4].As<v8::Object>();
  v8::Local<v8::ArrayBufferView> buffer = v8::Local<v8::ArrayBufferView>::Cast(bufferview);
  Callback *callback = new Callback(info[5].As<v8::Function>());
  assert(!callback->IsEmpty() && "Callback shoud not be empty");
  // spawns a new thread
  AsyncQueueWorker(new BufferWorker(
      callback
      , filename
      , height
      , width
      , minDb
    , buffer));
}

NAN_MODULE_INIT(Init) {
  Set(target
    , New<v8::String>("GetData").ToLocalChecked()
    , New<v8::FunctionTemplate>(GetData)->GetFunction());
}

NODE_MODULE(AsyncSPG, Init)
