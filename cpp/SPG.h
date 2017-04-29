#pragma once
#include <cstdint>
#include <vector>
class SPG {
public:
	SPG() {
		timeResolution = 0.0;
		frequencyResolution = 0.0;
		numFrequencyBins = 0;
	}
	virtual double getTimeResolution() {
		return timeResolution;
	}
	virtual double getFrequencyResolution() {
		return frequencyResolution;
	}
	virtual int32_t	getNumFrequencyBins() {
		return numFrequencyBins;
	}
	virtual std::vector<double>	getData() {
		return data;
	}
	~SPG() {
		
	}
protected:
	double	timeResolution; // (seconds)
	double	frequencyResolution; // (Hertz)
	int32_t	numFrequencyBins; // (vertical pixels per time step)
	std::vector<double>	data; // array of datapoints
};

