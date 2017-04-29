#pragma once
#ifdef __linux__
#include <string.h>
#endif // __linux__
#include <fstream>
#include <string>
#include <iostream>
#include "SPG.h"
class SPGReader : public SPG
{
public:
 SPGReader(std::string filename) : SPG(){
		spgfile.open(filename, std::ifstream::binary);
		if (spgfile.bad()) {
			std::cout << "bad spg file" << std::endl;
		}
		else {
			read();
		}
	}
	~SPGReader() {
	}
private:
	void read() {
		spgfile.seekg(0, spgfile.end);
		size_t size = (size_t)spgfile.tellg() - (sizeof(double) * 2) - sizeof(int32_t);
		size_t datasize = size/sizeof(double);
		spgfile.seekg(0, spgfile.beg);
		spgfile.read((char*)&timeResolution, sizeof(double));
		spgfile.read((char*)&frequencyResolution, sizeof(double));
		spgfile.read((char*)&numFrequencyBins, sizeof(int32_t));

		data.resize(datasize);
		memset(data.data(), 0, size);
		spgfile.read((char*)data.data(), size);
		if (!spgfile) {
			std::cout << "bad" << std::endl;
		}
		else {
			std::cout << "good" << std::endl;
		}
		spgfile.close();
	}
	std::ifstream spgfile;
};

