import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Timeline from '../components/timeline.jsx';

const Resume = () => {
    const tech = [
        {
            title: 'Lead Programmer',
            startDate: '2020',
            company: 'Global Game Jam'
        },
        {
            title: 'Programmer',
            startDate: '2019',
            company: 'Global Game Jam'
        },
        {
            title: 'Lead Programmer',
            startDate: '2018',
            company: 'Global Game Jam'
        },
        {
            title: 'Lead Programmer',
            startDate: '2018',
            company: 'Novas Valles Game Jam'
        },
        {
            title: 'Lead Programmer',
            startDate: '2017',
            company: 'Global Game Jam'
        },
    ]

    const nonTech = [
        {
            title: 'Sales Associate',
            startDate: '2024',
            endDate: 'Present',
            company: 'Masago Business SL',
            bulletPoints: [
                'Replenished stock.',
                'Operated the cash register.',
                'Provided customer service.',
                'Ensured the store was clean and organized.',
                'Collaborated with team members.'
            ],
        },
        
        {
            title: 'Forest Laborer',
            startDate: '2022',
            endDate: '2023',
            company: 'Ayuntamiento de Barracas',
            bulletPoints: [
                'Cleared and maintaned forests using brush cutters and chainsaws.',
                'Managed forest upkeep.',
                'Maintained forest trails.',
                'Collaborated with team members.'
            ],
        },
        {
            title: 'Sales Associate',
            startDate: '2022',
            company: 'Masago Business SL',
        },
    ]

    const education = [
        {
            title: 'Full Stack Development',
            startDate: '2024',
            company: '4Geeks Academy',
        },
        {
            title: 'Computer Games Programming',
            startDate: '2018',
            endDate: '2024',
            company: 'University of Gloucestershire',
            bulletPoints: [
                'Best Programmer nominee at COMX 2019',
            ],
        },
        {
            title: '3D Animation, Games and Interactive Environments',
            startDate: '2016',
            endDate: '2018',
            company: 'Florida Universitària',
        },
    ]

    return (
        <div className='min-height d-flex flex-column justify-content-between align-items-center'>
            <div className='mt-5'>
                <a className="button d-inline-flex align-items-center gap-2 text-decoration-none" href="https://raw.githubusercontent.com/BlondyMartinez/React-Portfolio/master/src/pdf/Resume_BlondyMartinez.pdf" download>
                    <Icon className='fs-3' icon='material-symbols-light:download' /> Download Resume
                </a>
            </div>

            <div className='row m-2 flex-grow-1 d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
                <Timeline title="Tech Experience" items={tech} />
                <Timeline title="Non-Tech Experience" items={nonTech} />
                <Timeline title="Education" items={education} />
            </div>

            <h6 className='orange-text'>*For extended work history check  
                <a href="https://www.linkedin.com/in/blondy-martinez/" target="_blank" className='text-decoration-none light-blue-text'> LinkedIn</a>.
            </h6>
        </div>
    );
};

export default Resume;