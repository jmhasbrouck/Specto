
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <math.h>
#include <fftw3.h>
#include <fenv.h>
#include "SpectrogramGenerator.hpp"
#include "window.hpp"
#include <cmath>
#define MIN_WIDTH 640
#define MIN_HEIGHT 480
#define MAX_WIDTH 8192
#define MAX_HEIGHT 4096
#define RESOLUTION 20 //hz

unsigned char *staticData = 0;

void get_colour_map_value(float value, double spec_floor_db, unsigned char colour[3])
{
	static unsigned char map[][3] =
		{
			/* These values were originally calculated for a dynamic range of 180dB. */
			{255, 255, 255}, /* -0dB */
			{240, 254, 216}, /* -10dB */
			{242, 251, 185}, /* -20dB */
			{253, 245, 143}, /* -30dB */
			{253, 200, 102}, /* -40dB */
			{252, 144, 66},  /* -50dB */
			{252, 75, 32},   /* -60dB */
			{237, 28, 41},   /* -70dB */
			{214, 3, 64},	/* -80dB */
			{183, 3, 101},   /* -90dB */
			{157, 3, 122},   /* -100dB */
			{122, 3, 126},   /* -110dB */
			{80, 2, 110},	/* -120dB */
			{45, 2, 89},	 /* -130dB */
			{19, 2, 70},	 /* -140dB */
			{1, 3, 53},		 /* -150dB */
			{1, 3, 37},		 /* -160dB */
			{1, 2, 19},		 /* -170dB */
			{0, 0, 0},		 /* -180dB */
		};

	float rem;
	int indx;

	if (value >= 0.0)
	{
		colour = map[0];
		return;
	};

	value = fabs(value * (-180.0 / spec_floor_db) * 0.1);

	indx = lrintf(floor(value));

	if (indx < 0)
	{
		printf("\nError : colour map array index is %d\n\n", indx);
		exit(1);
	};
	if (indx >= ARRAY_LEN(map) - 1)
	{
		colour = map[ARRAY_LEN(map) - 1];
		return;
	};

	rem = fmod(value, 1.0);

	colour[0] = lrintf((1.0 - rem) * map[indx][0] + rem * map[indx + 1][0]);
	colour[1] = lrintf((1.0 - rem) * map[indx][1] + rem * map[indx + 1][1]);
	colour[2] = lrintf((1.0 - rem) * map[indx][2] + rem * map[indx + 1][2]);
} /* get_colour_map_value */

static double window[10 * MAX_HEIGHT];
static int window_len = 0;
void apply_window(double *data, int datalen)
{
	if (window_len != datalen)
	{
		window_len = datalen;

		Window::calc_kaiser_window(window, datalen, RESOLUTION);
	};

	for (int k = 0; k < datalen; k++)
		data[k] *= window[k];
}

double
calc_magnitude(const double *freq, int freqlen, double *magnitude)
{
	int k;
	double max = 0.0;

	for (k = 1; k < freqlen / 2; k++)
	{
		magnitude[k] = sqrt(freq[k] * freq[k] + freq[freqlen - k - 1] * freq[freqlen - k - 1]);
		max = MAX(max, magnitude[k]);
	};
	magnitude[0] = 0.0;

	return max;
} /* calc_magnitude */

void render_spectrogram(double spec_floor_db, float mag2d[MAX_WIDTH][MAX_HEIGHT], double maxval, double width, double height)
{
    printf("%s", __func__);
	unsigned char colour[3] = {0, 0, 0};

	double linear_spec_floor;
	int w, h, stride, hght, wdth;
	w = 0;
	h = 0;
	hght = (int)height;
	wdth = (int)width;
#ifdef DEBUG
	printf("height: %f, width: %f\n", height, width);
#endif
	linear_spec_floor = pow(10.0, spec_floor_db / RESOLUTION);
	size_t counter = 0;
	//#pragma omp parallel for simd collapse(2) schedule(dynamic)
	for (w = 0; w < wdth; w++)
	{
		for (h = 0; h < hght; h++)
		{
			mag2d[w][h] = mag2d[w][h] / maxval;
			mag2d[w][h] = (mag2d[w][h] < linear_spec_floor) ? spec_floor_db : RESOLUTION * log10(mag2d[w][h]);

			get_colour_map_value(mag2d[w][h], spec_floor_db, colour);

			staticData[(h + hght * w) * 3] = colour[0];
			staticData[(h + hght * w) * 3 + 1] = colour[1];
			staticData[(h + hght * w) * 3 + 2] = colour[2];
		}
	}

#ifdef DEBUG
	printf("done with data\n");
#endif
} /* render_spectrogram */

void interp_spec(float *mag, int maglen, const double *spec, int speclen)
{
	int k, lastspec = 0;

	mag[0] = static_cast<float>(spec[0]);

	for (k = 1; k < maglen; k++)
	{
		double sum = 0.0;
		int count = 0;

		do
		{
			sum += spec[lastspec];
			lastspec++;
			count++;
		} while (lastspec <= ceil((k * speclen) / maglen));

		mag[k] = sum / count;
	};
} /* interp_spec */
inline int calculate_jump(int index, int total_samples, int width, int spectrum_length)
{
	return std::abs((index * total_samples) / width - spectrum_length / 2);
}
void calculate(const RENDER *render)
{
	static double single_mag_spec[5 * MAX_HEIGHT];
	static float mag_spec[MAX_WIDTH][MAX_HEIGHT];

	fftw_plan plan;
	double max_mag = 0.0;
	int width, height, w, samplerate, spectrum_length;
	samplerate = render->sample_rate;
	width = render->width;
	height = render->height;
    spectrum_length = height * (samplerate / RESOLUTION / height + 1) ;
    spectrum_length += 0x40 - (spectrum_length & 0x3f) ;
	int total_bytes = render->number_of_samples * sizeof(double);
    int jmp = 0;
    double single_max;
	static double *time_domain = new double[spectrum_length];
    memset(time_domain, 0, spectrum_length);
	static double *freq_domain = new double[spectrum_length];
    memset(freq_domain, 0, spectrum_length);
	plan = fftw_plan_r2r_1d(spectrum_length, time_domain, freq_domain, FFTW_R2HC, FFTW_MEASURE | FFTW_PRESERVE_INPUT);
	if (plan == NULL)
	{
		printf("%s : line %d : create plan failed.\n", __FILE__, __LINE__);
		exit(1);
	};
	for (w = 0; w < width; w++)
	{
        if(jmp + spectrum_length > render->number_of_samples) {
            printf("jmp + spectrum length > number of samples");
            break;
        }
        memcpy(time_domain, &render->pcm_data[jmp], spectrum_length);
        apply_window(time_domain, spectrum_length);
		fftw_execute(plan);

		single_max = calc_magnitude(freq_domain, spectrum_length, single_mag_spec);
		max_mag = MAX(max_mag, single_max);

		interp_spec(mag_spec[w - render->dataOffset], height, single_mag_spec, spectrum_length);
        jmp = std::abs((w * render->number_of_samples) / width - spectrum_length / 2);
	};
	delete[] time_domain;
	delete[] freq_domain;
	fftw_destroy_plan(plan);
	render_spectrogram(render->spec_floor_db, mag_spec, max_mag, width, height);
}

void getSpecData(const char *image_data, const double *pcm_data, int height, int width, double min_db, int samplerate, long long number_of_samples)
{
	RENDER render;
	staticData = (unsigned char *)image_data;
	if (staticData == 0 || pcm_data == 0)
	{
		printf("image or pcm data was null!");
		return;
	}
	memset(staticData, 0, height * width * 3);
	render.spec_floor_db = min_db;
	render.log_freq = false;
	render.width = width;
	render.height = height;
	render.sample_rate = samplerate;
	render.pcm_data = (double *)pcm_data;
	render.number_of_samples = number_of_samples;
	render.dataOffset = 0;
	calculate(&render);
}
