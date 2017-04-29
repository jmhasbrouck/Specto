{
  "targets": [
    {
      "target_name": "SPG",
      "sources": [
        "SPGSource.cc", "SPGWrapper.cc", "GetDataPointer.cc"
      ],
      
      	"libraries": ["-Wl,-rpath,<(module_root_dir)/lib/","-L<(module_root_dir)/lib/","-lSpectrogram"]
      
    }
  ]
}