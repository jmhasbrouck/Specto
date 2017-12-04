{
  "targets": [
  {
	"target_name": "
  },
    {
      "target_name": "SPG",
      "sources": [
        "SPGSource.cc", "SPGWrapper.cc", 
      ],
      "libraries": [
            "-lSpectrogram", "<(module_root_dir)/libs/"
          ],
          "cflags!": [ "-fno-exceptions" ],
          "cflags": [ "-std=c++11" ],
          "cflags_cc!": [ "-fno-exceptions" ]
        }
    }
  ]
}