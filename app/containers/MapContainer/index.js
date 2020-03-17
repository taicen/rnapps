import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchStations } from '../../redux/stations'
import MapComponent from '../../components/Map';

export default connect(
    ({ stations }) => ({
        stations
    }),
    (dispatch) => bindActionCreators({
        fetchStations
    }, dispatch),
)(MapComponent)