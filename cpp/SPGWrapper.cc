#include <string>
#include "SPGWrapper.h"

namespace ElectronLAC {
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
  Persistent<Function> SPGWrapper::constructor;

  SPGWrapper::SPGWrapper(std::string path) : spg(path){
    
  }
  SPGWrapper::~SPGWrapper() {

  }
  void SPGWrapper::Init(Local<Object> exports) {
    // Prepare constructor template
    Isolate* isolate = exports->GetIsolate();
    Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
    tpl->SetClassName(String::NewFromUtf8(isolate, "SPG"));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    
    // Prototype
    // sets the callback methods for the javascript object
    NODE_SET_PROTOTYPE_METHOD(tpl, "getFrequencyResolution", getFrequencyResolution);
    NODE_SET_PROTOTYPE_METHOD(tpl, "getAudioLength", getAudioLength);
    NODE_SET_PROTOTYPE_METHOD(tpl, "getData", getData);

    constructor.Reset(isolate, tpl->GetFunction());
    // sets how to call the object creation
    // in javascript:
    //      const obj = new SPG.MyObject("...");
    exports->Set(String::NewFromUtf8(isolate, "MyObject"),
		 tpl->GetFunction());
  }
  void SPGWrapper::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
      // getting file path as paramenter
      v8::String::Utf8Value param1(args[0]->ToString());
      std::string path = std::string(*param1);
      // calls itself...
      SPGWrapper* obj = new SPGWrapper(path);
      obj->Wrap(args.This());
      args.GetReturnValue().Set(args.This());
    } else {
      // Invoked as plain function `MyObject(...)`, turn into construct call.
      const int argc = 1;
      Local<Value> argv[argc] = { args[0] };
      Local<Context> context = isolate->GetCurrentContext();
      Local<Function> cons = Local<Function>::New(isolate, constructor);
      Local<Object> result =
        cons->NewInstance(context, argc, argv).ToLocalChecked();
      args.GetReturnValue().Set(result);
    }
  }
  // these are the functions that were set as callbacks above
  void SPGWrapper::getAudioLength(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    SPGWrapper* obj = ObjectWrap::Unwrap<SPGWrapper>(args.Holder());
    args.GetReturnValue().Set(Number::New(isolate, obj->spg.getAudioLength()));
  }

  void SPGWrapper::getFrequencyResolution(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    SPGWrapper* obj = ObjectWrap::Unwrap<SPGWrapper>(args.Holder());
    args.GetReturnValue().Set(Number::New(isolate, obj->spg.getFrequencyResolution()));
  }
  void SPGWrapper::getData(const FunctionCallbackInfo<Value>& args) {
    SPGWrapper* obj = ObjectWrap::Unwrap<SPGWrapper>(args.Holder());
    double height = args[0]->NumberValue();
    double width = args[1]->NumberValue();
    double minFreq = args[2]->NumberValue();
    Local<Value> bufferview = args[3]->ToObject();
    Local<ArrayBufferView> buffer = Local<ArrayBufferView>::Cast(bufferview);
    char* localData = (char*)buffer->Buffer()->GetContents().Data();
    if (localData != 0) {
      obj->spg.getData(localData, height, width, minFreq);
    }
  }
} // namespace ElectronLAC

  
