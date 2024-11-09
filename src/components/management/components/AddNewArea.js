import React, { useRef, useState, useMemo } from 'react';
import axiosInstance from 'utils/AxiosInstance';
import { useUserContext } from 'globalComponents/AppContext';
import { ThreeDots } from 'react-loader-spinner';

const AddNewArea = ({ setAddNewArea, fetchStateAndCity }) => {
    const formRef = useRef(null);
    const { setAlert } = useUserContext();

    const [formData, setFormData] = useState({
        stateName: "",
        cityName: "",
        areaName: ""
    });
    const [stateId, setStateId ] = useState(null)
    const [cityId, setCityId ] = useState(null)
    const [index, setIndex] = useState(1);
    const [loader, setLoader] = useState(false);

    function capitalizeWords(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }      

    const handleClose = () => {
        setFormData({ stateName: "", cityName: "", areaName: "" });
        setIndex(1);
        setLoader(false);
        setAlert(null);
        setAddNewArea(false);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormScroll = () => {
        if (formRef.current) {
            formRef.current.scrollTo({
                left: 384 * index, // Adjust as needed
                behavior: "smooth"
            });
            setIndex(prev => prev + 1);
        }
    };

    const handleDisabledButton = () => {
        const fields = ["stateName", "cityName", "areaName"];
        return !formData[fields[index - 1]];
    };

    const isButtonDisabled = useMemo(handleDisabledButton, [index, formData]);

    const handleAddState = () => {
        setLoader(true)

        if (formData.stateName && index === 1) {
            axiosInstance
            .post("all/states/", { state: capitalizeWords(formData.stateName) })
            .then(res => {
                console.log(res)
                setStateId(res.data.id)
                handleFormScroll()
                setAlert("State Added")
                fetchStateAndCity()
            })
            .catch(err => {
                console.error(err)
                setAlert(err.response.data.state[0])
            })
            .finally(() => {
                setLoader(false)
            })

            return
        }

        if (formData.cityName && index === 2) {
            axiosInstance
            .post("all/cities/", { city: capitalizeWords(formData.cityName), state_id: stateId })
            .then(res => {
                console.log(res)
                setCityId(res.data.id)
                handleFormScroll()
                setAlert("City Added")
            })
            .catch(err => {
                console.error(err)
                setAlert("error")
            })
            .finally(() => {
                setLoader(false)
            })

            return
        }

        if (formData.areaName && index === 3) {
            axiosInstance
            .post("all/areas/", { area: capitalizeWords(formData.areaName), city_id: cityId })
            .then(res => {
                console.log(res)
                handleFormScroll()
                setAlert("Area Added")
            })
            .catch(err => {
                console.error(err)
                setAlert("error")
            })
            .finally(() => {
                setLoader(false)
            })

            return
        }
    }

    return (
        <div className='w-fit p-6 bg-orange-500 relative bg-opacity-20 z-[9999] px- rounded-xl shadow-3xl border-2 border-orange-600'>
            <button 
                onClick={handleClose}
                className='text-orange-600 bg-white px-3 rounded-full py-1 shadow-2xl text-sm font-semibold absolute top-2 right-2'
            >
                close
            </button>

            <p className='text-center text-xl font-medium'>
                Add New Area
            </p>

            <div ref={formRef} className='flex w-[24rem] items-center justify-start mt-10 overflow-x-hidden'>
                <div className='w-full min-w-[24rem]'>
                    <label className='pl-4'>
                        Enter State Name:
                    </label>
                    <input
                        type='text'
                        placeholder='State'
                        className='w-full mt-1 border border-orange-600 bg-opacity-80 bg-white focus:outline-none rounded-full h-10 px-5'
                        value={formData.stateName}
                        onChange={handleInputChange}
                        name='stateName'
                    />
                </div>
                <div className='w-full min-w-[24rem]'>
                    <label className='pl-4'>
                        Enter City Name:
                    </label>
                    <input
                        type='text'
                        placeholder='City'
                        className='w-full mt-1 border border-orange-600 bg-opacity-80 bg-white focus:outline-none rounded-full h-10 px-5'
                        value={formData.cityName}
                        onChange={handleInputChange}
                        name='cityName'
                    />
                </div>
                <div className='w-full min-w-[24rem]'>
                    <label className='pl-4'>
                        Enter Area Name:
                    </label>
                    <input
                        type='text'
                        placeholder='Area'
                        className='w-full mt-1 border border-orange-600 bg-opacity-80 bg-white focus:outline-none rounded-full h-10 px-5'
                        value={formData.areaName}
                        onChange={handleInputChange}
                        name='areaName'
                    />
                </div>
            </div>

            <div className='w-full flex items-center justify-end'>
                <button
                    onClick={handleAddState}
                    disabled={isButtonDisabled}
                    className='mt-6 bg-green-600 disabled:bg-gray-500 focus:outline-none rounded-full h-8 flex items-center justify-center text-sm w-20 text-white font-medium'
                >
                    {loader ? <ThreeDots color='#fff' width={40} /> : "Save"}
                </button>
            </div>
        </div>
    );
};

export default AddNewArea;