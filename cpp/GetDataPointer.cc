// hello.cc
#include <node.h>
#include <iostream>
namespace GetPointer {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void GetPointer(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  uintptr_t retval = 0;
  Local<Value> bufferview = args[0]->ToObject();
  Local<ArrayBufferView> buffer = Local<ArrayBufferView>::Cast(bufferview);
  if (buffer->HasBuffer()){
    char* localData = (char*)buffer->Buffer()->GetContents().Data();
    std::cout <<"Getting buffer\n";
    if (buffer->Buffer()->GetContents().ByteLength() != (size_t)(height * width * 3)) {
      std::cout <<"Buffer is not the correct size! " << __FILE__ << ":" << __LINE__ << std::endl;
    }
    else {
      std::cout << retval << std::endl;
      retval = (uintptr_t)localData;
    }
  }
  else {
    std::cout << "buffer has no data" << std::endl;

  }
  args.GetReturnValue().Set(Number::New(isolate, retval));
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "GetDataPointer", GetPointer);
}

NODE_MODULE(addon, init)

}  // namespace demo
