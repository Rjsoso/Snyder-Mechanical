import { useState } from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';
import Card from '../components/shared/Card';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'pumps-equipment', label: 'Pumps & Equipment' }
  ];

  const filteredProjects = filter === 'all' 
    ? portfolioData 
    : portfolioData.filter(project => project.category === filter);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-500 via-primary-500 to-secondary-600 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Explore our completed projects across northeastern Nevada
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white border-b border-secondary-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filter === cat.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="aspect-video bg-secondary-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-secondary-400 text-sm">Project Image</span>
                  </div>
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-secondary-600 mb-2">
                    {project.description}
                  </p>
                  <p className="text-sm text-secondary-500">
                    {project.details}
                  </p>
                  <p className="text-sm text-secondary-400 mt-2">
                    Completed: {project.year}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
