import { useState } from 'react';
import './App.css';
import axios from 'axios';
import logo from "./Logo.png"

const height = window.innerHeight


function App() {
  const [cybring, setCybring] = useState(false)
  const [attack, setAttack] = useState('')
  const [bg, setBg] = useState('')

  const [url, setURL] = useState('')

  const handleCyber = async (e) => {
    e.preventDefault()
    setCybring(true)


    let l = ["protocol", "flag", "packet", "senderID", "ipSource", "portSource", "packetSize"]

    let d = {
      "Man-in-the-Middle": "alert alert-primary", 
      "SQL Injection": "alert alert-danger", 
      "Cross-Site Scripting": "alert alert-warning", 
      "Ransomware": "alert alert-info", 
      "DDoS": "alert alert-light"
    }


    let data = new Object()

    for (let i = 1; i <= 7; i++) {
      data[l[i - 1]] = document.getElementById(`f${i}`).value
    }

    let response = await axios.post("http://127.0.0.1:4001/detect_threat", data)
    setCybring(false)

    setAttack(response.data.threat)
    setBg(d[response.data.threat])
  }

  const handlePhish = async(e) => {
    e.preventDefault()

    let data = {url: url}

    let rep = await axios("http://127.0.0.1:4001/phishing", data)

    console.log(rep.data)
  }

  return (
    <div className="App" style={{height: height}}>
      <div className='about'>
        <div>
          <img src={logo} />
        </div>
      </div>

      <div className='ops'>
        <div className='cyber'>
          <div className='title'> <i class='bx bx-search-alt'></i> Detect a threat </div>

          <div className='disc'>
            Given the information about the packet, <span style={{fontWeight: 500, color: "red"}}>C</span><span style={{fontWeight: 500}}>y</span> will utilize a machine learning model to 
            assist in detecting threats within your network.
          </div>

          <div className='packet'>
            <div className='t'>
              <select class="form-select" id='f1' aria-label="Default select example">
                <option value=''>Protocol</option>
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
              </select>

              <select class="form-select" id='f2' aria-label="Default select example">
                <option value=''>Flag</option>
                <option value="SYN">SYN</option>
                <option value="ACK">ACK</option>
                <option value="RST">RST</option>
                <option value="FIN">FIN</option>
              </select>

              <select class="form-select" id='f3' aria-label="Default select example">
                <option value=''>Packet</option>
                <option value="SSH">SSH</option>
                <option value="NTP">NTP</option>
                <option value="FTP">FTP</option>
                <option value="SNMP">SNMP</option>
                <option value="HTTPS">HTTPS</option>
                <option value="DNS">DNS</option>
                <option value="DHCP">DHCP</option>
                <option value="SMTP">SMTP</option>
              </select>

              <select class="form-select" id='f4' aria-label="Default select example">
                <option value=''>Sender ID</option>
                <option value="789012">789012</option>
                <option value="345678">345678</option>
                <option value="456789">456789</option>
                <option value="234567">234567</option>
                <option value="123456">123456</option>
                <option value="987654">987654</option>
                <option value="567890">567890</option>
                <option value="901234">901234</option>
                <option value="890123">890123</option>
                <option value="678901">678901</option>
              </select>

              <select class="form-select" id='f5' aria-label="Default select example">
                <option value=''>Source IP Address</option>
                <option value="10.0.0.2">10.0.0.2</option>
                <option value="192.168.1.10">192.168.1.10</option>
                <option value="10.0.0.5">10.0.0.5</option>
                <option value="10.0.0.8">10.0.0.8</option>
                <option value="192.168.0.5">192.168.0.5</option>
                <option value="192.168.0.1">192.168.0.1</option>
                <option value="192.168.1.5">192.168.1.5</option>
                <option value="10.0.0.15">10.0.0.15</option>
                <option value="192.168.0.2">192.168.0.2</option>
                <option value="10.0.0.10">10.0.0.10</option>
              </select>
            </div>

            <div className='bl'>
              <select class="form-select" id='f6' aria-label="Default select example">
                <option value=''>Source Port</option>
                <option value="12345">12345</option>
                <option value="161">161</option>
                <option value="21">21</option>
                <option value="443">443</option>
                <option value="67">67</option>
                <option value="25">25</option>
                <option value="22">22</option>
                <option value="123">123</option>
                <option value="20">20</option>
              </select>

              <select class="form-select" id='f7' aria-label="Default select example">
                <option value=''>Packet Size</option>
                <option value="128">128</option>
                <option value="256">256</option>
                <option value="512">512</option>
                <option value="768">768</option>
                <option value="1024">1024</option>
                <option value="2048">2048</option>
                <option value="4096">4096</option>
              </select>
            </div>
          </div>

          <div className='act'>
            {cybring ? <div class="alert alert-dark" role="alert">
                          Detecting ...
                      </div> : ""}
            {
              attack ? <div class={bg} role="alert">
              {attack}
            </div> : ""
            }
            <button type="button" onClick={handleCyber} class="btn btn-danger">Detect</button>
          </div>
        </div>

        <div className='phish'>
          <div className='title'> <i class='bx bx-search-alt'></i> Analyze the URL : </div>

          <div className='disc'>
            Given a URL, <span style={{fontWeight: 500, color: "red"}}>C</span><span style={{fontWeight: 500}}>y</span> will analyze it and run an 
            ML model to determine whether the URL is phishing or not.
          </div>

          <div className='url'>
            <input type="text" onChange={(e) => setURL(url)} class="form-control" id="exampleFormControlInput1" placeholder="Type the URL"/>
          </div>

          <div className='act'>
              {/* {cybring ? <div class="alert alert-dark" role="alert">
                            Detecting ...
                        </div> : ""}
              {
                attack ? <div class={bg} role="alert">
                {attack}
              </div> : ""
              } */}
              
              <button type="button" onClick={handlePhish} class="btn btn-danger">Analyze</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
