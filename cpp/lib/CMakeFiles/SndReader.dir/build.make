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
include CMakeFiles/SndReader.dir/depend.make

# Include the progress variables for this target.
include CMakeFiles/SndReader.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/SndReader.dir/flags.make

CMakeFiles/SndReader.dir/src/SndFile.c.o: CMakeFiles/SndReader.dir/flags.make
CMakeFiles/SndReader.dir/src/SndFile.c.o: src/SndFile.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/james/Documents/CingSnd/cpp/lib/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building C object CMakeFiles/SndReader.dir/src/SndFile.c.o"
	/usr/bin/cc  $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/SndReader.dir/src/SndFile.c.o   -c /home/james/Documents/CingSnd/cpp/lib/src/SndFile.c

CMakeFiles/SndReader.dir/src/SndFile.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/SndReader.dir/src/SndFile.c.i"
	/usr/bin/cc  $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/james/Documents/CingSnd/cpp/lib/src/SndFile.c > CMakeFiles/SndReader.dir/src/SndFile.c.i

CMakeFiles/SndReader.dir/src/SndFile.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/SndReader.dir/src/SndFile.c.s"
	/usr/bin/cc  $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/james/Documents/CingSnd/cpp/lib/src/SndFile.c -o CMakeFiles/SndReader.dir/src/SndFile.c.s

CMakeFiles/SndReader.dir/src/SndFile.c.o.requires:

.PHONY : CMakeFiles/SndReader.dir/src/SndFile.c.o.requires

CMakeFiles/SndReader.dir/src/SndFile.c.o.provides: CMakeFiles/SndReader.dir/src/SndFile.c.o.requires
	$(MAKE) -f CMakeFiles/SndReader.dir/build.make CMakeFiles/SndReader.dir/src/SndFile.c.o.provides.build
.PHONY : CMakeFiles/SndReader.dir/src/SndFile.c.o.provides

CMakeFiles/SndReader.dir/src/SndFile.c.o.provides.build: CMakeFiles/SndReader.dir/src/SndFile.c.o


CMakeFiles/SndReader.dir/src/window.c.o: CMakeFiles/SndReader.dir/flags.make
CMakeFiles/SndReader.dir/src/window.c.o: src/window.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/james/Documents/CingSnd/cpp/lib/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building C object CMakeFiles/SndReader.dir/src/window.c.o"
	/usr/bin/cc  $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/SndReader.dir/src/window.c.o   -c /home/james/Documents/CingSnd/cpp/lib/src/window.c

CMakeFiles/SndReader.dir/src/window.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/SndReader.dir/src/window.c.i"
	/usr/bin/cc  $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/james/Documents/CingSnd/cpp/lib/src/window.c > CMakeFiles/SndReader.dir/src/window.c.i

CMakeFiles/SndReader.dir/src/window.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/SndReader.dir/src/window.c.s"
	/usr/bin/cc  $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/james/Documents/CingSnd/cpp/lib/src/window.c -o CMakeFiles/SndReader.dir/src/window.c.s

CMakeFiles/SndReader.dir/src/window.c.o.requires:

.PHONY : CMakeFiles/SndReader.dir/src/window.c.o.requires

CMakeFiles/SndReader.dir/src/window.c.o.provides: CMakeFiles/SndReader.dir/src/window.c.o.requires
	$(MAKE) -f CMakeFiles/SndReader.dir/build.make CMakeFiles/SndReader.dir/src/window.c.o.provides.build
.PHONY : CMakeFiles/SndReader.dir/src/window.c.o.provides

CMakeFiles/SndReader.dir/src/window.c.o.provides.build: CMakeFiles/SndReader.dir/src/window.c.o


CMakeFiles/SndReader.dir/src/common.c.o: CMakeFiles/SndReader.dir/flags.make
CMakeFiles/SndReader.dir/src/common.c.o: src/common.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/james/Documents/CingSnd/cpp/lib/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building C object CMakeFiles/SndReader.dir/src/common.c.o"
	/usr/bin/cc  $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/SndReader.dir/src/common.c.o   -c /home/james/Documents/CingSnd/cpp/lib/src/common.c

CMakeFiles/SndReader.dir/src/common.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/SndReader.dir/src/common.c.i"
	/usr/bin/cc  $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/james/Documents/CingSnd/cpp/lib/src/common.c > CMakeFiles/SndReader.dir/src/common.c.i

CMakeFiles/SndReader.dir/src/common.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/SndReader.dir/src/common.c.s"
	/usr/bin/cc  $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/james/Documents/CingSnd/cpp/lib/src/common.c -o CMakeFiles/SndReader.dir/src/common.c.s

CMakeFiles/SndReader.dir/src/common.c.o.requires:

.PHONY : CMakeFiles/SndReader.dir/src/common.c.o.requires

CMakeFiles/SndReader.dir/src/common.c.o.provides: CMakeFiles/SndReader.dir/src/common.c.o.requires
	$(MAKE) -f CMakeFiles/SndReader.dir/build.make CMakeFiles/SndReader.dir/src/common.c.o.provides.build
.PHONY : CMakeFiles/SndReader.dir/src/common.c.o.provides

CMakeFiles/SndReader.dir/src/common.c.o.provides.build: CMakeFiles/SndReader.dir/src/common.c.o


# Object files for target SndReader
SndReader_OBJECTS = \
"CMakeFiles/SndReader.dir/src/SndFile.c.o" \
"CMakeFiles/SndReader.dir/src/window.c.o" \
"CMakeFiles/SndReader.dir/src/common.c.o"

# External object files for target SndReader
SndReader_EXTERNAL_OBJECTS =

libSndReader.so: CMakeFiles/SndReader.dir/src/SndFile.c.o
libSndReader.so: CMakeFiles/SndReader.dir/src/window.c.o
libSndReader.so: CMakeFiles/SndReader.dir/src/common.c.o
libSndReader.so: CMakeFiles/SndReader.dir/build.make
libSndReader.so: /usr/lib/x86_64-linux-gnu/libsndfile.so
libSndReader.so: /usr/lib/x86_64-linux-gnu/libfftw3.so
libSndReader.so: /usr/lib/x86_64-linux-gnu/libm.so
libSndReader.so: CMakeFiles/SndReader.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/james/Documents/CingSnd/cpp/lib/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Linking C shared library libSndReader.so"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/SndReader.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/SndReader.dir/build: libSndReader.so

.PHONY : CMakeFiles/SndReader.dir/build

CMakeFiles/SndReader.dir/requires: CMakeFiles/SndReader.dir/src/SndFile.c.o.requires
CMakeFiles/SndReader.dir/requires: CMakeFiles/SndReader.dir/src/window.c.o.requires
CMakeFiles/SndReader.dir/requires: CMakeFiles/SndReader.dir/src/common.c.o.requires

.PHONY : CMakeFiles/SndReader.dir/requires

CMakeFiles/SndReader.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/SndReader.dir/cmake_clean.cmake
.PHONY : CMakeFiles/SndReader.dir/clean

CMakeFiles/SndReader.dir/depend:
	cd /home/james/Documents/CingSnd/cpp/lib && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/james/Documents/CingSnd/cpp/lib /home/james/Documents/CingSnd/cpp/lib /home/james/Documents/CingSnd/cpp/lib /home/james/Documents/CingSnd/cpp/lib /home/james/Documents/CingSnd/cpp/lib/CMakeFiles/SndReader.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/SndReader.dir/depend

