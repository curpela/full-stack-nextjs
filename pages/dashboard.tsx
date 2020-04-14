import React from 'react'
import ListingDashboard from '../components/Dashboards/ListingDashboard'
import NavAuth from '../components/Layout/NavAuth'

export default function dashboard() {
    return (
        <div>
            <NavAuth />
            <ListingDashboard />
        </div>
    )
}
