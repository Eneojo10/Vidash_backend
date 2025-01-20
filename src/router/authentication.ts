import express from 'express';

import { register } from '../controllers/authentication';
import { estates,getAllEstates } from '../controllers/estates'
import {navigations,getAllNavs } from '../controllers/nav'
import { getRecent } from '../controllers/homebanner';
import { createBanner } from '../controllers/homebanner';
import { contact, getAllContact } from '../controllers/contact';
import { getBannersByNavId } from '../controllers/homebanner';
import { getBannersByEstateId, getBannerById } from '../controllers/homebanner';
import { inquiries, getAllInquiries } from '../controllers/inquiry';
import { locations, getAllLocations} from '../controllers/location';
import { property, getAllProperties} from '../controllers/property';
import { inspections, getAllInspections } from '../controllers/inspection';
import { info, getAllInfo } from '../controllers/information';
import { getAllTours, tours } from '../controllers/tour';
import { getAllSchedule, schedules } from '../controllers/schedule';
import { time, getAllTime } from '../controllers/time';
import { getAllAreas, createAreas } from '../controllers/area'
import { getSite, sites, getAreaByName, getSiteById } from '../controllers/site'
import upload from '../middleware/multer'



export default (router: express.Router) => {
    router.get('/getAllEstates', getAllEstates)
    router.get('/getAllNavs', getAllNavs)
    router.get('/getRecent', getRecent)
    router.get('/getAllContact', getAllContact)
    router.get('/getBannersByNavId/:nav_id', getBannersByNavId)
    router.get('/getBannersByEstateId/:estate_id', getBannersByEstateId)
    router.get('/getBannerById/:id', getBannerById)
    router.get('/getSiteById/:id', getSiteById)
    router.get('/getAllInfo', getAllInfo)
    router.get('/getAllInspections', getAllInspections)
    router.get('/getAllProperties', getAllProperties)
    router.get('/getAllLocations', getAllLocations)
    router.get('/getAllInquiries', getAllInquiries)
    router.get('/getAllTours', getAllTours)
    router.get('/getAllSchedule', getAllSchedule)
    router.get('/getAllTime', getAllTime)
    router.get('/getAllAreas', getAllAreas)
    router.get('/getAreaByName/name/:areaName', getAreaByName)
    router.get('/getSite', getSite)
    router.post('/sites', upload.single('image',), sites)
    router.post('/createAreas',createAreas)
    router.post('/time', time)
    router.post('/schedules', schedules)
    router.post('/tours', tours)
    router.post('/banner', upload.single('image', ), createBanner)
    router.post('/navigations', navigations)
    router.post('/register', register);
    router.post('/estates', estates)
    router.post('/contact', contact);
    router.post('/inquiries', inquiries);
    router.post('/locations', locations);
    router.post('/property', property)
    router.post('/inspections', inspections)
    router.post('/info', info)
    // router.post('/auth/login', login);
    // router.post('/projects', projects);
}