#include <node.h>
#include "SpectrogramGenerator.hpp"
namespace SpectrogramGenerator {
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::ArrayBufferView;

// from js: CalculateSpectrogram(height, width, min_db, sample_rate, image_data, pcm_data)
void CalculateSpectrogram(const FunctionCallbackInfo<Value>& args) {
    double height = args[0]->NumberValue();
    double width = args[1]->NumberValue();
    double min_db = args[2]->NumberValue();
    int sample_rate = (int)args[3]->NumberValue();
    Local<Value> bufferview = args[4]->ToObject();
    Local<ArrayBufferView> buffer = Local<ArrayBufferView>::Cast(bufferview);
    char* image_data = (char*)buffer->Buffer()->GetContents().Data();

    Local<Value> bufferview2 = args[5]->ToObject();
    Local<ArrayBufferView> buffer2 = Local<ArrayBufferView>::Cast(bufferview2);
    //todo: check that the decoded pcm is truly a TypedArray of Float64! If its a Float32 array, change to floats
    double* pcm_data = (double*)buffer2->Buffer()->GetContents().Data();

    if (image_data != 0 && pcm_data != 0) {
      SpectrogramGenerator::getSpecData(image_data, pcm_data, height, width, min_db, sample_rate);
    }
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "CalculateSpectrogram", SpectrogramGenerator::CalculateSpectrogram);
}

NODE_MODULE(SPG, init)
}