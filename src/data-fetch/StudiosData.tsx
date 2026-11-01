const getStudiosData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`);
  const studios = await res.json();
  console.log(studios);

  return studios;
};

export default getStudiosData;
