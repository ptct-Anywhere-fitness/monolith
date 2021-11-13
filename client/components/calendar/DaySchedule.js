import React, {useState, useEffect} from 'react'

// ==============================================

const DaySchedule = ({apnts, apnt_type}) => {

  // -------------------------------------------

  // Inputs: 
  //  1. apnts (array of objects)
  //        -Each object contains data from db
  //         corresponding to one appointment.
  //        -Properties: {_id, year, month, day, hour, min, type, TODO: user_id}
  //  2. apnt_type (int) [User Only]
  //        -If appointment type is set (not undefined)
  //         then display the availabilities

  // -------------------------------------------

  // -These helper functions convert between the
  //  hour property of each apnt and the time
  //  (unitless miltary time, 
  //   and 12-hour with am/pm suffix)

  //              0    1    2    3    4    5    6    7    8    9
  const hr_map = [8,   9,   10,  11,  12,  13,  14,  15,  16,  17];
  //              8am  9am  10am 11am 12am 1pm  2pm  3pm  4pm  5pm
  const idx2hr = idx => hr_map[idx];
  const hr2idx = hr  => hr_map.findIndex(elem => elem == hr);

  const military2twelveHr = hr => (
    // Input:  number :: int in range [0,24) for military time
    // Output: string :: value for 12hr time (e.g., 1pm)
    hr < 12 ? `${hr}am` : 
      hr == 12 ? `${hr}pm` : `${hr % 12}pm`
  );

  // -------------------------------------------

  // -This helper function converts the apnt's
  //  type property to the duration of the apnt.
  // -The type2hr_map array should be set in 
  //  the admin settings.
  // -Current units are in hours.

  const type2hr_map = [0, 1, 2, 3, 4];
  const type2hr = type => type2hr_map[type];

  // -------------------------------------------

  // -The starting_times array stores the possible
  //  starting times of apnt's.
  // -Values are in military time.
  // -These values should be configured in 
  //  the admin settings.

  const configure_starting_times = (first, last) => {
    let starting_times = [];
    for (let i = first; i <= last; i++)
      starting_times.push(i);
    return starting_times;
  };
  const starting_times = configure_starting_times(8, 16);

  // -------------------------------------------

  const [available_times, setAvailableTimes] = useState([]);

  useEffect(() => {

    const start_of_day = hr_map[0];
    const end_of_day = hr_map[hr_map.length - 1];
 
    for (let hr = start_of_day; hr < end_of_day; ) {
      apnts.forEach((apnt, jdx) => {
        if (apnt.hour === hr) {
          // Step 0: No availability starting at this time
          // Step 1: Determine duration
          // Step 2: Increment hr by duration
          // Step 3: Repeat if statement
        }
      })
    }

    // Step 1: Compare hour with apnt[0].hour
    // Step 2: 

  }, [apnts]);

  // -------------------------------------------

  return (

      <div >

        <div className="time-legend-container">
          {starting_times.map((starting_time, idx) => {
            if (idx < starting_times.length - 1) {
              return (
                <div>
                  <div style={{width: 'fit-content', transform: 'translateX(-50%)'}}>{military2twelveHr(starting_time)}</div>
                </div>
              );
            } else {
              return (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div style={{width: 'fit-content', transform: 'translateX(-50%)'}}>{military2twelveHr(starting_time)}</div>
                  <div style={{width: 'fit-content', transform: 'translateX(50%)'}}>{military2twelveHr(starting_time + 1)}</div>
                </div>
              );
            }
          })}
        </div>

        <div className="borderLeft-borderRight-container">
          <div className="row">




              <div className="grid-for-apnts" style={apnt_type ? {display: 'none'} : {} }>
                {apnts && apnts.map((apnt) => {

                  // Admin View (apnts currently scheduled)
                  return (
                    <div style={{display: 'grid', placeItems: 'center', background: 'purple', gridColumnStart: `${hr2idx(apnt.hour) + 1}`, gridColumnEnd: `${hr2idx(apnt.hour) + 1 + type2hr(apnt.type)}`}}></div>
                  );
                })}
              </div>

              <div className="grid-for-apnts" style={apnt_type ? {} : {display: 'none'} }>
                {available_times && available_times.map((available_time) => {

                  // Admin View (apnts currently scheduled)
                  return (
                    <div style={{display: 'grid', placeItems: 'center', background: 'purple', gridColumnStart: `${hr2idx(available_time) + 1}`, gridColumnEnd: `${hr2idx(available_time) + 1 + type2hr(apnt_type)}`}}>
                      Click Me
                    </div>
                  );
                })}
              </div>



              {/* if apnt_type is set => display availabilities, else display appointments */}
              {/* <div className="grid-for-apnts" style={apnt_type ? {} : {display: 'none'} }>
              

                {apnts && apnts.map((apnt, idx) => {
                  if (idx === 0 && apnt.hour !== hr_map[0]) {
                    return (
                      <div style={{display: 'grid', placeItems: 'center', background: 'orange', gridColumnStart: `${1}`, gridColumnEnd: `${hr2idx(apnts[0].hour) + 1}`}}></div>
                    );
                  }
                })}

                {apnts && apnts.map((apnt, idx) => {
   
                  // 3-cases of availabilities:
                  //  -1. Appointment that starts after first possible time
                  //  -2. Between appointments
                  //  -3. After last appointment until last possible time

                  if (idx < apnts.length - 1) { // Case 2:
                    // Admin View (apnts currently scheduled)
                    return (
                      <div style={{display: 'grid', placeItems: 'center', background: 'rgba(255, 0, 0, 0.5)', gridColumnStart: `${hr2idx(apnt.hour) + type2hr(apnt.type) + 1}`, gridColumnEnd: `${hr2idx(apnts[idx+1].hour) + 1}`}}></div>
                    );
                  }                   
                  else { // Case 3:
                    return (
                      // <div style={{display: 'grid', placeItems: 'center', background: 'yellow', gridColumnStart: `${hr2idx(apnt.hour) + type2hr(apnt.type) + 1}`, gridColumnEnd: `${hr2idx(hr_map.length)}`}}></div>
                      <div style={{display: 'grid', placeItems: 'center', background: 'yellow', gridColumnStart: `${hr2idx(apnt.hour) + type2hr(apnt.type) + 1}`, gridColumnEnd: `${hr2idx(hr_map[hr_map.length-1]) + 1}`}}></div>
                    );
                  }

                })}
              </div> */}


              <div className="grid-for-lines">
                {starting_times.map((starting_time, idx) => {
                  return (
                    <div style={{display: 'grid', placeItems: 'center', background: 'white', gridColumnStart: `${idx+1}`, gridColumnEnd: `${idx+2}`}}></div>
                  );
                })}
              </div>

          </div>
        </div>
        
        

      </div>


  );
};

// ==============================================

export default DaySchedule;

// ==============================================