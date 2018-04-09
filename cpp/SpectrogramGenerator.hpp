
/******************************************* ORIGINAL COPYRIGHT **********************************************
** Copyright (C) 2007-2009 Erik de Castro Lopo <erikd@mega-nerd.com>
**
** This program is free software: you can redistribute it and/or modify
** it under the terms of the GNU General Public License as published by
** the Free Software Foundation, either version 2 or version 3 of the
** License.
**
** This program is distributed in the hope that it will be useful,
** but WITHOUT ANY WARRANTY; without even the implied warranty of
** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
** GNU General Public License for more details.
**
** You should have received a copy of the GNU General Public License
** along with this program.  If not, see <http://www.gnu.org/licenses/>.
*************************************************************************************************************/

// code liberally taken from mega-nerd.com (thank you Erik de Castro Lopo!)
// original code generated a png
// the original code was modified to fill a buffer of bytes

#ifndef SNDFILE_H
#define SNDFILE_H
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <math.h>
#include <fftw3.h>

#include "window.h"

#define MIN_WIDTH 640
#define MIN_HEIGHT 480
#define MAX_WIDTH 8192
#define MAX_HEIGHT 4096
namespace SpectrogramGenerator
{
typedef struct
{
	int width, height, dataOffset;
	bool log_freq;
	double spec_floor_db;
	int sample_rate;
	double *pcm_data;
} RENDER;

#define ARRAY_LEN(x) ((int)(sizeof(x) / sizeof(x[0])))
#define MAX(x, y) ((x) > (y) ? (x) : (y))
#define MIN(x, y) ((x) < (y) ? (x) : (y))

void getSpecData(const char *image_data, const double *pcm_data, int height, int width, double minDb, int samplerate);
}
#endif
