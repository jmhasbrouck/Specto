#include <node.h>
#include "SPGWrapper.h"
namespace ElectronLAC {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void InitAll(Local<Object> exports, Local<Object> module) {
  SPGWrapper::Init(exports);
}

NODE_MODULE(SPG, InitAll)
}  // namespace ElectronLAC
