import serviceData from '../../data/detailed-services.json';
import ServiceDetailPage from '../../components/shared/ServiceDetailPage';

const HeatingServices = () => (
  <>
    <title>Heating Services | Snyder Mechanical – Elko, NV</title>
    <meta name="description" content="Expert heating installation, repair, and maintenance in northeastern Nevada. Furnaces, heat pumps, and boilers serviced by Snyder Mechanical's certified technicians." />
    <ServiceDetailPage service={serviceData.heating} serviceKey="heating" />
  </>
);

export default HeatingServices;
