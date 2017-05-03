{
  "targets": [
    {
      "target_name": "SPG",
      "sources": [
        "SPGSource.cc", "SPGWrapper.cc", 
      ],
      'conditions': [
        ['OS=="linux"', {
          'include_dirs': [
            '<(module_root_dir)/deps/blpapi/include-3.8.8.1'
          ],
          'ldflags': [
            '-Wl,-R<(module_root_dir)/deps/blpapi/linux',
            '-L<(module_root_dir)/deps/blpapi/linux'
          ],
          'conditions': [
            ['target_arch=="ia32"', {
              'libraries': [ '-lblpapi3_32' ]
            }],
            ['target_arch=="x64"', {
              'libraries': [ '-lblpapi3_64' ]
            }]
          ]
        }],
        ['OS=="mac"', {
          'ldflags': [
            '-Wl,-rpath,<(module_root_dir)/lib/',
            '-L<(module_root_dir)/lib/'
          ],
          'conditions': [
            ['target_arch=="ia32"', {
              'libraries': [ '-lSpectrogram' ],
              'xcode_settings': { 'ARCHS': [ 'i386' ] }
            }],
            ['target_arch=="x64"', {
              'libraries': [ '-lSpectrogram' ],
              'xcode_settings': { 'ARCHS': [ 'x86_64' ] }
            }]
          ],
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
            'GCC_ENABLE_CPP_RTTI': 'NO',
            'INSTALL_PATH': '@rpath',
            'LD_DYLIB_INSTALL_NAME': '',
            'OTHER_LDFLAGS': [
              '-Wl,-search_paths_first',
              '-Wl,-rpath,<(module_root_dir)/lib/',
              '-L<(module_root_dir)/lib/'
            ],
	    'OTHER_CFLAGS': [ '-mmacosx-version-min=10.7', '-std=c++11', '-stdlib=libc++', '-O3', '-D__STDC_CONSTANT_MACROS', '-D_FILE_OFFSET_BITS=64', '-D_LARGEFILE_SOURCE', '-Wall' ],
            'OTHER_CPLUSPLUSFLAGS': [ '-mmacosx-version-min=10.7', '-std=c++11', '-stdlib=libc++', '-O3', '-Wall' ]		    
          }
        }]
      ]
    }
  ]
}