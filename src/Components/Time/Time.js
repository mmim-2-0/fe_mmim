import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./Time.css";

const Time = ({ meetingTime, setMeetingTime }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00 PM");
  const [timezone, setTimezone] = useState("-06:00");

  const handleDateInput = (e) => {
    setDate(e.target.value);
  };
  const handleTimeInput = (e) => {
    setTime(e.target.value);
  };

  const handleTimezoneInput = (e) => {
    setTimezone(e.target.value);
  };

  useEffect(() => {
    setMeetingTime(`${date} ${time} GMT${timezone}`);
  });

  return (
    <div className='meetingTimeContainer'>
      <input
        type='date'
        className='dateInput'
        onChange={handleDateInput}
        value={date}
        min={dayjs(new Date()).format("YYYY-MM-DD")}
      />
      <select
        name='time'
        className='timeInput'
        id='time'
        value={time}
        onChange={handleTimeInput}
      >
        <option value='5:00 AM'>5:00 AM</option>
        <option value='5:15 AM'>5:15 AM</option>
        <option value='5:30 AM'>5:30 AM</option>
        <option value='5:45 AM'>5:45 AM</option>

        <option value='6:00 AM'>6:00 AM</option>
        <option value='6:15 AM'>6:15 AM</option>
        <option value='6:30 AM'>6:30 AM</option>
        <option value='6:45 AM'>6:45 AM</option>

        <option value='7:00 AM'>7:00 AM</option>
        <option value='7:15 AM'>7:15 AM</option>
        <option value='7:30 AM'>7:30 AM</option>
        <option value='7:45 AM'>7:45 AM</option>

        <option value='8:00 AM'>8:00 AM</option>
        <option value='8:15 AM'>8:15 AM</option>
        <option value='8:30 AM'>8:30 AM</option>
        <option value='8:45 AM'>8:45 AM</option>

        <option value='9:00 AM'>9:00 AM</option>
        <option value='9:15 AM'>9:15 AM</option>
        <option value='9:30 AM'>9:30 AM</option>
        <option value='9:45 AM'>9:45 AM</option>

        <option value='10:00 AM'>10:00 AM</option>
        <option value='10:15 AM'>10:15 AM</option>
        <option value='10:30 AM'>10:30 AM</option>
        <option value='10:45 AM'>10:45 AM</option>

        <option value='11:00 AM'>11:00 AM</option>
        <option value='11:15 AM'>11:15 AM</option>
        <option value='11:30 AM'>11:30 AM</option>
        <option value='11:45 AM'>11:45 AM</option>

        <option value='12:00 PM'>12:00 PM</option>
        <option value='12:15 PM'>12:15 PM</option>
        <option value='12:30 PM'>12:30 PM</option>
        <option value='12:45 PM'>12:45 PM</option>

        <option value='1:00 PM'>1:00 PM</option>
        <option value='1:15 PM'>1:15 PM</option>
        <option value='1:30 PM'>1:30 PM</option>
        <option value='1:45 PM'>1:45 PM</option>

        <option value='2:00 PM'>2:00 PM</option>
        <option value='2:15 PM'>2:15 PM</option>
        <option value='2:30 PM'>2:30 PM</option>
        <option value='2:45 PM'>2:45 PM</option>

        <option value='3:00 PM'>3:00 PM</option>
        <option value='3:15 PM'>3:15 PM</option>
        <option value='3:30 PM'>3:30 PM</option>
        <option value='3:45 PM'>3:45 PM</option>

        <option value='4:00 PM'>4:00 PM</option>
        <option value='4:15 PM'>4:15 PM</option>
        <option value='4:30 PM'>4:30 PM</option>
        <option value='4:45 PM'>4:45 PM</option>

        <option value='5:00 PM'>5:00 PM</option>
        <option value='5:15 PM'>5:15 PM</option>
        <option value='5:30 PM'>5:30 PM</option>
        <option value='5:45 PM'>5:45 PM</option>

        <option value='6:00 PM'>6:00 PM</option>
        <option value='6:15 PM'>6:15 PM</option>
        <option value='6:30 PM'>6:30 PM</option>
        <option value='6:45 PM'>6:45 PM</option>

        <option value='7:00 PM'>7:00 PM</option>
        <option value='7:15 PM'>7:15 PM</option>
        <option value='7:30 PM'>7:30 PM</option>
        <option value='7:45 PM'>7:45 PM</option>

        <option value='8:00 PM'>8:00 PM</option>
        <option value='8:15 PM'>8:15 PM</option>
        <option value='8:30 PM'>8:30 PM</option>
        <option value='8:45 PM'>8:45 PM</option>

        <option value='9:00 PM'>9:00 PM</option>
        <option value='9:15 PM'>9:15 PM</option>
        <option value='9:30 PM'>9:30 PM</option>
        <option value='9:45 PM'>9:45 PM</option>

        <option value='10:00 PM'>10:00 PM</option>
        <option value='10:15 PM'>10:15 PM</option>
        <option value='10:30 PM'>10:30 PM</option>
        <option value='10:45 PM'>10:45 PM</option>

        <option value='11:00 PM'>11:00 PM</option>
        <option value='11:15 PM'>11:15 PM</option>
        <option value='11:30 PM'>11:30 PM</option>
        <option value='11:45 PM'>11:45 PM</option>
      </select>
      <select
        name='timezone_offset'
        className='timezoneInput'
        id='timezone-offset'
        value={timezone}
        onChange={handleTimezoneInput}
      >
        <option value='-12:00'>(GMT -12:00) Eniwetok, Kwajalein</option>
        <option value='-11:00'>(GMT -11:00) Midway Island, Samoa</option>
        <option value='-10:00'>(GMT -10:00) Hawaii</option>
        <option value='-09:50'>(GMT -9:30) Taiohae</option>
        <option value='-09:00'>(GMT -9:00) Alaska</option>
        <option value='-08:00'>
          (GMT -8:00) Pacific Time (US &amp; Canada)
        </option>
        <option value='-07:00'>
          (GMT -7:00) Mountain Time (US &amp; Canada)
        </option>
        <option value='-06:00'>
          (GMT -6:00) Central Time (US &amp; Canada), Mexico City
        </option>
        <option value='-05:00'>
          (GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima
        </option>
        <option value='-04:50'>(GMT -4:30) Caracas</option>
        <option value='-04:00'>
          (GMT -4:00) Atlantic Time (Canada), Caracas, La Paz
        </option>
        <option value='-03:50'>(GMT -3:30) Newfoundland</option>
        <option value='-03:00'>
          (GMT -3:00) Brazil, Buenos Aires, Georgetown
        </option>
        <option value='-02:00'>(GMT -2:00) Mid-Atlantic</option>
        <option value='-01:00'>(GMT -1:00) Azores, Cape Verde Islands</option>
        <option value='+00:00'>
          (GMT) Western Europe Time, London, Lisbon, Casablanca
        </option>
        <option value='+01:00'>
          (GMT +1:00) Brussels, Copenhagen, Madrid, Paris
        </option>
        <option value='+02:00'>(GMT +2:00) Kaliningrad, South Africa</option>
        <option value='+03:00'>
          (GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg
        </option>
        <option value='+03:50'>(GMT +3:30) Tehran</option>
        <option value='+04:00'>
          (GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi
        </option>
        <option value='+04:50'>(GMT +4:30) Kabul</option>
        <option value='+05:00'>
          (GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent
        </option>
        <option value='+05:50'>
          (GMT +5:30) Bombay, Calcutta, Madras, New Delhi
        </option>
        <option value='+05:75'>(GMT +5:45) Kathmandu, Pokhara</option>
        <option value='+06:00'>(GMT +6:00) Almaty, Dhaka, Colombo</option>
        <option value='+06:50'>(GMT +6:30) Yangon, Mandalay</option>
        <option value='+07:00'>(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
        <option value='+08:00'>
          (GMT +8:00) Beijing, Perth, Singapore, Hong Kong
        </option>
        <option value='+08:75'>(GMT +8:45) Eucla</option>
        <option value='+09:00'>
          (GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk
        </option>
        <option value='+09:50'>(GMT +9:30) Adelaide, Darwin</option>
        <option value='+10:00'>
          (GMT +10:00) Eastern Australia, Guam, Vladivostok
        </option>
        <option value='+10:50'>(GMT +10:30) Lord Howe Island</option>
        <option value='+11:00'>
          (GMT +11:00) Magadan, Solomon Islands, New Caledonia
        </option>
        <option value='+11:50'>(GMT +11:30) Norfolk Island</option>
        <option value='+12:00'>
          (GMT +12:00) Auckland, Wellington, Fiji, Kamchatka
        </option>
        <option value='+12:75'>(GMT +12:45) Chatham Islands</option>
        <option value='+13:00'>(GMT +13:00) Apia, Nukualofa</option>
        <option value='+14:00'>(GMT +14:00) Line Islands, Tokelau</option>
      </select>
    </div>
  );
};

export default Time;
