cmake_minimum_required(VERSION 3.0.1)
project(SndReader C)
project(Spectrogram CXX)

# Force C++11
if(CMAKE_COMPILER_IS_GNUCXX)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=gnu++0x")
endif()
if("${CMAKE_CXX_COMPILER_ID}" STREQUAL "Clang")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")
  if(APPLE)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -stdlib=libc++")
  endif()
endif()

set(SPECSOURCE src/Spectrogram.cpp)
set(SNDSOURCE src/SndFile.c src/window.c src/common.c)
set(SPECHEADER src/Spectrogram.h)
set(SNDHEADER src/SndFile.h src/window.h src/common.h)
  
# On Windows the library location must be explicitly specified
if(WIN32)
    
endif()

find_library(SNDFILE sndfile)
find_library(FFTW3 fftw3)
find_library(MATH m)

message("sndfile is at: ${SNDFILE}")
message("fftw3 is at: ${FFTW3}")
message("math is at: ${MATH}")


add_library(Spectrogram SHARED ${SPECSOURCE} ${SPECHEADER})
target_link_libraries(Spectrogram LINK_PUBLIC SndReader)

add_library(SndReader SHARED ${SNDSOURCE} ${SNDHEADER})
target_link_libraries(SndReader LINK_PUBLIC ${SNDFILE})
target_link_libraries(SndReader LINK_PUBLIC ${FFTW3})
target_link_libraries(SndReader LINK_PUBLIC ${MATH})
