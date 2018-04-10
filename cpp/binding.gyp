{
  "targets": [
    {
      "target_name": "SPG", 
      "sources": [
        "Main.cpp", "SpectrogramGenerator.cpp", "window.cpp"
      ],
      'libraries': ['-lfftw3', '-lm'],
      "cflags!": [ "-fno-exceptions"],
      "cflags": [ "-std=c++11"],
      "cflags_cc!": [ "-fno-exceptions"]
    }
  ]
}
