-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- ========================================
-- ServiceProjects Table
-- ========================================
CREATE TABLE ServiceProjects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    Location VARCHAR(255) NOT NULL,
    Date DATE,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);

INSERT INTO ServiceProjects (organization_id, title, description, Location, Date) 

VALUES

(1, 'Community Center Refurbishment', 'Painting and structural repairs to the downtown youth center.', 'Downtown Metro', '2026-04-12'),

(1, 'Eco-Friendly Housing Pilot', 'Constructing a sustainable tiny home prototype using recycled materials.', 'North Hills', '2026-05-20'),

(1, 'Park Bench Installation', 'Assembling and installing 15 weather-resistant benches along the river trail.', 'Riverside Park', '2026-06-05'),

(1, 'Roofing for Seniors', 'Replacing damaged shingles for low-income elderly residents.', 'Westside District', '2026-07-15'),

(1, 'School Playground Build', 'Designing and building a new modular playground set for the primary school.', 'East Village', '2026-08-01'),

(2, 'Urban Rooftop Garden Setup', 'Installing hydroponic systems and soil beds on the library roof.', 'City Library', '2026-04-22'),

(2, 'Community Orchard Planting', 'Planting 50 fruit-bearing trees to provide free produce for the neighborhood.', 'Southside Commons', '2026-05-10'),

(2, 'Organic Farming Workshop', 'A hands-on session teaching residents how to compost and manage pests naturally.', 'GreenHarvest Farm', '2026-06-12'),

(2, 'Seed Distribution Drive', 'Packaging and giving away heirloom vegetable seeds to local families.', 'Market Square', '2026-03-25'),

(2, 'Irrigation System Repair', 'Restoring the greywater recycling system for the community allotment.', 'Central Gardens', '2026-07-08'),

(3, 'Homeless Shelter Meal Service', 'Preparing and serving nutritional three-course meals for 200 guests.', 'Unity Hall', '2026-04-01'),

(3, 'After-School Tutoring Program', 'Providing math and literacy support for middle school students.', 'Public Library Branch B', '2026-04-15'),

(3, 'Senior Tech Support Day', 'Helping elderly citizens navigate smartphones and video calling software.', 'Golden Age Home', '2026-05-05'),

(3, 'Neighborhood Cleanup', 'Removing litter and graffiti from the historical district streets.', 'Old Town', '2026-05-30'),

(3, 'Clothing Drive & Sort', 'Collecting and organizing seasonal attire for local families in need.', 'UnityServe Warehouse', '2026-06-20');
 


-- ========================================
-- Categories Table
-- ========================================

 CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);


-- ========================================
-- Project_Categories Table
-- ========================================
CREATE TABLE project_categories (
    project_id INT,
    category_id INT,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES serviceprojects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

INSERT INTO categories (name)
VALUES
('Community Service'),
('Education'),
('Environmental');

INSERT INTO project_categories (project_id, category_id)
VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 1);
