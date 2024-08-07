import styles from './contact.module.scss';

import ContentBlock from '../components/ContentBlock.jsx';
import SplitBlock from '../components/SplitBlock.jsx';
import TripleBlock from '../components/TripleBlock.jsx';

import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Contact(){
    return (<>
        <ContentBlock content={<>
            <h1 className="display-1">Contact Us</h1>
        </>} mt="15" mb="15" />

        <ContentBlock content={<>
            <div className="text-primary">
                Mauris elit porttitor nibh tincidunt erat morbi quis integer. 
                Fusce semper interdum massa tempus accumsan netus nisi dui. 
                Mauris nibh nisi luctus inceptos bibendum cras torquent mattis. 
                Maecenas aptent efficitur eros mus integer.
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Contact Information</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" required></input>
                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Alternative Contact Method (not required)"></input>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your information with anyone else.</small>
                </div>
                <br></br>
                <div className="form-group">
                    <label>Message</label>
                    <textarea className="form-control" aria-label="Messsage" rows="10" placeholder="Your message" required></textarea>
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>} mt="15" mb="15" />
    </>)
}

export default Contact