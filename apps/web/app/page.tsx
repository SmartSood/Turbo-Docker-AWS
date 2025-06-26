import prisma from "db/client";





export default async function Home() {
  const users = await prisma.user.findMany();

  console.log(users);
  return (
   <div>
    {JSON.stringify(users)}
   </div>
  );
}

export const revalidate = 60;
// export const dynamic = "force-dynamic";
