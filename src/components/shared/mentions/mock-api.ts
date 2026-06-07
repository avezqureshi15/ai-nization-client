export const fetchMockUsers = async (query: string) => {
  return [
    { id: 1, name: "Avez", type: "user" , email:"avez@webknot.in" },
    { id: 2, name: "Avinash", type: "user" , email:"avinash@webknot.in"},
    { id: 3, name: "Rahul", type: "user", email:"rahul@webknot.in" },
  ].filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const fetchMockRecruitments = async (query: string) => {
  const jobs = [
    { id: 1, title: "Frontend Engineer", description:"Frontend Engineer Recuritment being peformed" },
    { id: 2, title: "Backend Engineer", description:"Backend Engineer Recuritment being peformed" },
    { id: 3, title: "Fullstack Developer", description:"Fullstack Engineer Recuritment being peformed" },
  ];

  return jobs.filter((j) =>
    j.title.toLowerCase().includes(query.toLowerCase())
  );
};