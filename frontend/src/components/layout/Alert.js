import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
  <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    { alert.msg }
  </div>
))


Alert.propTypes = {
  alerts:  PropTypes.array.isRequired
}

//mapping Redux state to props so that we can use that prop/state in this component
const mapStateToProps = state => ({     //this function mapStateToProps takes in a state as parameter
  alerts: state.alert                   //in state.alert, alert comes from root reducer i.e. reducers/index.js; it's a prop here which you can use by passing in as parameter in const Alert above
});

export default connect(mapStateToProps)(Alert);
