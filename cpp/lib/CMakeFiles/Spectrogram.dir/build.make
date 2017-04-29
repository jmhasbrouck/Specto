# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.5

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/james/Documents/CingSnd/cpp/lib

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/james/Documents/CingSnd/cpp/lib

# Include any dependencies generated for this target.
include CMakeFiles/Spectrogram.dir/depend.make

# Include the progress variables for this target.
include CMakeFiles/Spectrogram.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/Spectrogram.dir/flags.make

CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o: CMakeFiles/Spectrogram.dir/flags.make
CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o: src/Spectrogram.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/james/Documents/CingSnd/cpp/lib/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o"
	/usr/bin/c++   $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o -c /home/james/Documents/CingSnd/cpp/lib/src/Spectrogram.cpp

CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.i"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/james/Documents/CingSnd/cpp/lib/src/Spectrogram.cpp > CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.i

CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.s"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/james/Documents/CingSnd/cpp/lib/src/Spectrogram.cpp -o CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.s

CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o.requires:

.PHONY : CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o.requires

CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o.provides: CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o.requires
	$(MAKE) -f CMakeFiles/Spectrogram.dir/build.make CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o.provides.build
.PHONY : CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o.provides

CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o.provides.build: CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o


# Object files for target Spectrogram
Spectrogram_OBJECTS = \
"CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o"

# External object files for target Spectrogram
Spectrogram_EXTERNAL_OBJECTS =

libSpectrogram.so: CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o
libSpectrogram.so: CMakeFiles/Spectrogram.dir/build.make
libSpectrogram.so: libSndReader.so
libSpectrogram.so: /usr/lib/x86_64-linux-gnu/libsndfile.so
libSpectrogram.so: /usr/lib/x86_64-linux-gnu/libfftw3.so
libSpectrogram.so: /usr/lib/x86_64-linux-gnu/libm.so
libSpectrogram.so: CMakeFiles/Spectrogram.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/james/Documents/CingSnd/cpp/lib/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX shared library libSpectrogram.so"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/Spectrogram.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/Spectrogram.dir/build: libSpectrogram.so

.PHONY : CMakeFiles/Spectrogram.dir/build

CMakeFiles/Spectrogram.dir/requires: CMakeFiles/Spectrogram.dir/src/Spectrogram.cpp.o.requires

.PHONY : CMakeFiles/Spectrogram.dir/requires

CMakeFiles/Spectrogram.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/Spectrogram.dir/cmake_clean.cmake
.PHONY : CMakeFiles/Spectrogram.dir/clean

CMakeFiles/Spectrogram.dir/depend:
	cd /home/james/Documents/CingSnd/cpp/lib && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/james/Documents/CingSnd/cpp/lib /home/james/Documents/CingSnd/cpp/lib /home/james/Documents/CingSnd/cpp/lib /home/james/Documents/CingSnd/cpp/lib /home/james/Documents/CingSnd/cpp/lib/CMakeFiles/Spectrogram.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/Spectrogram.dir/depend

