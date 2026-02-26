import serviceData from '../../data/detailed-services.json';
import ServiceDetailPage from '../../components/shared/ServiceDetailPage';

const PlumbingServices = () => (
  <>
    <title>Plumbing Services | Snyder Mechanical – Elko, NV</title>
    <meta name="description" content="Residential and commercial plumbing services in Elko and northeastern Nevada. Repairs, installations, and maintenance by Snyder Mechanical's licensed plumbers." />
    <ServiceDetailPage service={serviceData.plumbing} serviceKey="plumbing" />
  </>
);

export default PlumbingServices;
