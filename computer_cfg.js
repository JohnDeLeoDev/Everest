/****************************************************************************
 * File to save computer feature requirements and use for filter, add cases
 *      DEFAULT VALUE ORDERING IS MIN TO MAX
 ***************************************************************************/

//these are database values to save
//use for Add Computer Store Owner Use Case

export const computer_cfg = {
    "Memory": ["1 GB", "4 GB", "8 GB", "16 GB", "32 GB"],
    "Storage" : ["128 GB", "256 GB", "512 GB", "1 TB", "2 TB", "4 TB"],
    "Graphics" : ["NVIDIA GEForce RTX 4090", "NVIDIA GEForce RTX 4080", 
                 "AMD Radeon Pro W6300", "AMD Radeon Pro X6400", 
                 "Intel Integrated Graphics", "Intel UHD Graphics 730", "Intel UHD Graphics 770"],
    "ProcessGen" : ["13th Gen Intel", "12th Gen Intel", "11th Gen Intel", 
                   "AMD Ryzan 7000 Series", "AMD Ryzen 6000 Series"],
    "Processor" : ["Intel i9", "Intel i7", "Intel i5", "Intel i3", "AMD Ryzen 9 7950X", "AMD Ryzen 7 5950X", "AMD Ryzen 5 4600G"]
}

//these are labels for search filters
export const computer_filter_labels = {
    "Price" : ["$500 or less", "$501-$1000", "$1001-$1,500", "$1,501-$2000", "$2001 or more"],
    "Memory" : ["4 GB or less", "8 GB", "16 GB", "32 GB"],
    "Storage" : ["256 GB or less", "512 GB", "1 TB", "2 TB"],
    "Processor" : ["All IntIntel Processors", "All AMD Processors", "Any Processors"],
    "ProcessGen" : ["11th Gen Intel", "12th Gen Intel", "13th Gen Intel", 
                    "AMD Ryzan 6000 Series", "AMD Ryzan 7000 Series"],
    "Graphics" : ["All NVIDIA Graphics", "All AMD Graphics", "All Intel Graphics", "Any Graphics"]
}

