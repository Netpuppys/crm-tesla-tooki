import React, { useEffect, useState } from 'react';
import RedButton from 'globalComponents/ui/RedButton';
import "../../styles/components/Communities/Communities.css"

const communities = [
    "Konoha Village - Naruto",
    "Soul Society - Bleach",
    "Gensokyo - Touhou Project",
    "Survey Corps - Attack on Titan",
    "Luffy's Crew - One Piece",
    "Hinamizawa Village - Higurashi: When They Cry",
    "SOS Brigade - The Melancholy of Haruhi Suzumiya",
    "Class 1-A - My Hero Academia",
    "Fairy Tail Guild - Fairy Tail",
    "Seven Deadly Sins - The Seven Deadly Sins",
    "Berserk Band of the Hawk - Berserk",
    "Shibusen - Soul Eater",
    "Whitebeard Pirates - One Piece",
    "Team Rocket - Pokémon",
    "Blaze Brigade - Fire Force"
];

const Communities = () => {
    const [newCommunityData, setNewCommunityData] = useState({ firstName: "", lastName: "", email: "", mobile: "" });
    const [selectedCommunity, setSelectedCommunity] = useState("");

    useEffect(() => {
        console.log(newCommunityData);
    }, [newCommunityData]);

    const handleInputChange = (value, keyName) => {
        setNewCommunityData(prev => ({
            ...prev,
            [keyName]: value,
        }));
    };

    const handleSelectChange = (event) => {
        setSelectedCommunity(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedCommunity) {
            console.log(selectedCommunity)
        } else if (!selectedCommunity && newCommunityData) {
            console.log(newCommunityData)
        }
    }

    return (
        <div className='communities-main-div'>
            <p className='page-title'>Communities</p>
            <p className='sub-title'>Create New Community</p>

            <div className='communities-inputs-container'>
                <div className='new-community-form'>
                    <input
                        type='text'
                        placeholder='First Name'
                        className='community-input'
                        value={newCommunityData.firstName}
                        onChange={e => handleInputChange(e.target.value, "firstName")}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        className='community-input'
                        value={newCommunityData.lastName}
                        onChange={e => handleInputChange(e.target.value, "lastName")}
                    />
                    <input
                        type='email'
                        placeholder='Email ID'
                        className='community-input email-input'
                        value={newCommunityData.email}
                        onChange={e => handleInputChange(e.target.value, "email")}
                    />
                    <input
                        type='number'
                        placeholder='Mobile Number'
                        className='community-input'
                        value={newCommunityData.mobile}
                        onChange={e => handleInputChange(e.target.value, "mobile")}
                    />
                </div>

                <div className='or-divider'>
                    <div className='divider'></div>
                    <p className='or-text'>OR</p>
                    <div className='divider'></div>
                </div>

                <div className='select-community-div'>
                    <select 
                        value={selectedCommunity} 
                        onChange={handleSelectChange}
                    >
                        <option value="">Select a community</option>
                        {communities.map((community, index) => (
                            <option 
                                key={index} 
                                value={community}
                            >
                                {community}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <RedButton text={"Submit"} onClickHandler={handleSubmit}/>
        </div>
    );
};

export default Communities;
