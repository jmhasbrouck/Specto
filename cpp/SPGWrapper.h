// myobject.h
#ifndef SPGWRAPPER_H
#define SPGWRAPPER_H
#define BYTES_PER_PIXEL 3 // rgb

#include <string>
#include <node.h>
#include <node_object_wrap.h>
#include "Spectrogram.h"
namespace ElectronLAC {
class SPGWrapper : public node::ObjectWrap {
 public:
  static void Init(v8::Local<v8::Object> exports);
  
 private:
  explicit SPGWrapper(std::string path);
  ~SPGWrapper();
  static void getTimeResolution(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void getAudioLength(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void getFrequencyResolution(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void getNumFrequencyBins(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void getData(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  
  static v8::Persistent<v8::Function> constructor;
  Spectrogram spg;
  static double lowest_decibel;
  static double highest_decibel;
};
 
}  // namespace ElectronLAC

#endif //SPGWRAPPER_H
