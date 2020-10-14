import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'
import mapMarkerImage from '../images/map-marker.svg'

import 'leaflet/dist/leaflet.css'

import '../styles/pages/orphanages-map.css'

function OrphanagesMap(): JSX.Element {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImage} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas criançase estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Caruaru</strong>
          <span>Pernambuco</span>
        </footer>
      </aside>

      <Map
        center={[-8.2888477, -35.9722315]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanagesMap
