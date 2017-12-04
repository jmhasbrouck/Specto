{
  "targets": [
    {
      "target_name": "SPG", 
      "sources": [
        "SPGSource.cc", "SPGWrapper.cc" 
      ],
      "libraries": [
            "-lSpectrogram", "-I<(module_root_dir)/lib/."
          ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags": [ "-std=c++11" ],
      "cflags_cc!": [ "-fno-exceptions" ]
    }
  ]
}
