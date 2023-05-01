import React from 'react';
import './index.css';

const Navbar = React.lazy(() => import('./components/Navbar'));
const Footer = React.lazy(() => import('./components/Footer'));
const HeroCard = React.lazy(() => import('./components/HeroCard'));
const SpotLight = React.lazy(() => import('./components/SpotLight'));
const TextBlock = React.lazy(() => import('./components/TextBlock'));
const Cards = React.lazy(() => import('./components/Cards'));
const Blogs = React.lazy(() => import('./components/Blogs'));

export default { Navbar, Footer, HeroCard, SpotLight, TextBlock, Blogs, Cards };
