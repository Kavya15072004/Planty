// Step 1: Backend (server/index.js)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
ap.use(cors());

mongoose.connect('mongodb://localhost:27017/planty', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

const Plant = mongoose.model('Plant', new mongoose.Schema({
    name: String,
    price: Number,
    imageUrl: String
}));

app.get('/plants', async (req, res) => {
    const plants = await Plant.find();
    res.json(plants);
});

app.post('/plants', async (req, res) => {
    const { name, price, imageUrl } = req.body;
    const plant = new Plant({ name, price, imageUrl });
    await plant.save();
    res.json(plant);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Step 2: Frontend Redux Store (client/src/store.js)
import { configureStore, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const plantSlice = createSlice({
    name: 'plants',
    initialState: { plants: [] },
    reducers: {
        setPlants: (state, action) => { state.plants = action.payload; }
    }
});

export const { setPlants } = plantSlice.actions;
export const fetchPlants = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/plants');
    dispatch(setPlants(response.data));
};

const store = configureStore({ reducer: { plants: plantSlice.reducer } });
export default store;

// Step 3: React Frontend (client/src/App.js)
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlants } from './store';
import './App.css';

function App() {
    const dispatch = useDispatch();
    const plants = useSelector(state => state.plants.plants);

    useEffect(() => { dispatch(fetchPlants()); }, [dispatch]);

    return (
        <div className="container">
            <h1 className="title">Planty Store</h1>
            <div className="grid">
                {plants.map(plant => (
                    <div key={plant._id} className="card">
                        <img src={plant.imageUrl} alt={plant.name} className="image" />
                        <h2 className="name">{plant.name}</h2>
                        <p className="price">${plant.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
