// hello.cc
#include <node.h>
#include <iostream>
namespace GetPointer {
  using v8::Context;
  using v8::Function;
  using v8::FunctionCallbackInfo;
  using v8::FunctionTemplate;
  using v8::Isolate;
  using v8::Local;
  using v8::Number;
  using v8::Integer;
  using v8::Handle;
  using v8::Array;
  using v8::Object;
  using v8::Persistent;
  using v8::String;
  using v8::Value;
  using v8::Uint8Array;
  using v8::ArrayBufferView;
  
void GetPointer(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  uintptr_t retval = 0;
  Local<Value> bufferview = args[0]->ToObject();
  Local<ArrayBufferView> buffer = Local<ArrayBufferView>::Cast(bufferview);
  if (buffer->HasBuffer()){
    char* localData = (char*)buffer->Buffer()->GetContents().Data();
    std::cout <<"Getting buffer\n";
    
    retval = (uintptr_t)localData;
    std::cout << retval << std::endl;
  }
  else {
    std::cout << "buffer has no data" << std::endl;

  }
  args.GetReturnValue().Set(Number::New(isolate, retval));
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "GetDataPointer", GetPointer);
}

NODE_MODULE(GetPointer, init)

}  // namespace demo
