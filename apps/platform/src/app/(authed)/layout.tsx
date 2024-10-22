import { UserContextProvider } from "~/modules/auth/user.context";
import { getSession } from "../actions";
import { serverClient } from "~/trpc/server";
import { MyEventsProvider } from "~/modules/event-management/events.context";
import { faker } from "@faker-js/faker";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession({ ensureSignedIn: true });
  const [events, attending] = await Promise.all([
    serverClient.event.all.query(),
    serverClient.profile.attending.query(),
  ]);

  const fakeUsers = [
    { name: "Frederick Schuster", email: "frederick.schuster@yahoo.com", color: "orange", status: "pending" },
    {
      name: "Fred Heller",
      email: "fred_heller@hotmail.com",
      color: "teal",
      status: "pending",
      image: "https://loremflickr.com/1707/416/people?lock=2937582460554615",
    },
    {
      name: "Mrs. Katie Wolff",
      email: "mrs._katiewolff50@gmail.com",
      color: "yellow",
      status: "pending",
      image: "https://loremflickr.com/216/1170/people?lock=6995997859559577",
    },
    { name: "Barbara Rutherford", email: "barbara.rutherford@yahoo.com", color: "lime", status: "pending" },
    { name: "Antonia Rath PhD", email: "antonia_rathphd@gmail.com", color: "mint", status: "approved" },
    {
      name: "Darlene Littel",
      email: "darlene.littel36@hotmail.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/1141/3076/people?lock=5216979603099674",
    },
    {
      name: "Lucia Stamm",
      email: "lucia_stamm75@yahoo.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/928/2737/people?lock=5995060771213972",
    },
    { name: "Eugene Johns", email: "eugene_johns@hotmail.com", color: "gold", status: "approved" },
    {
      name: "Erik Dach-Jakubowski",
      email: "erik_dach-jakubowski@hotmail.com",
      color: "iris",
      status: "approved",
    },
    {
      name: "Dr. Lionel Weimann",
      email: "dr._lionelweimann82@yahoo.com",
      color: "iris",
      status: "approved",
      image: "https://loremflickr.com/503/1683/people?lock=8402994920950225",
    },
    {
      name: "Evan Doyle",
      email: "evan.doyle74@hotmail.com",
      color: "iris",
      status: "approved",
      image: "https://loremflickr.com/551/899/people?lock=4766085764145284",
    },
    {
      name: "Pat Lang-Rowe",
      email: "pat.lang-rowe@gmail.com",
      color: "teal",
      status: "approved",
      image: "https://loremflickr.com/3591/3838/people?lock=2769412532873697",
    },
    { name: "Ms. Shirley Rohan", email: "ms._shirleyrohan64@yahoo.com", color: "iris", status: "approved" },
    { name: "Cindy Schimmel", email: "cindy_schimmel@yahoo.com", color: "yellow", status: "approved" },
    {
      name: "Mr. Wesley Christiansen",
      email: "mr._wesleychristiansen90@gmail.com",
      color: "yellow",
      status: "approved",
    },
    {
      name: "Miss Carole Kerluke",
      email: "miss_carolekerluke20@gmail.com",
      color: "cyan",
      status: "approved",
      image: "https://loremflickr.com/2351/1299/people?lock=2540615791917102",
    },
    {
      name: "Emmett Dibbert",
      email: "emmett_dibbert@hotmail.com",
      color: "cyan",
      status: "approved",
      image: "https://loremflickr.com/752/1626/people?lock=5811293090884281",
    },
    {
      name: "Melissa Raynor",
      email: "melissa_raynor81@hotmail.com",
      color: "blue",
      status: "approved",
      image: "https://loremflickr.com/642/2062/people?lock=710384909099154",
    },
    {
      name: "Deanna Witting",
      email: "deanna.witting10@hotmail.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/3517/3839/people?lock=7744426509411426",
    },
    {
      name: "Steve Wilderman",
      email: "steve.wilderman@hotmail.com",
      color: "gold",
      status: "approved",
      image: "https://loremflickr.com/1130/3758/people?lock=1088032421539838",
    },
    {
      name: "Miss Kerry Davis",
      email: "miss.kerrydavis52@gmail.com",
      color: "yellow",
      status: "approved",
      image: "https://loremflickr.com/1388/323/people?lock=100354205878189",
    },
    {
      name: "Dixie DuBuque",
      email: "dixie_dubuque@yahoo.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/2867/1244/people?lock=4287492426899454",
    },
    { name: "Shirley O'Hara", email: "shirley.ohara19@hotmail.com", color: "cyan", status: "approved" },
    {
      name: "Gerard Walter",
      email: "gerard.walter@hotmail.com",
      color: "gold",
      status: "approved",
      image: "https://loremflickr.com/3576/2851/people?lock=8651473337660009",
    },
    {
      name: "Vickie Crona",
      email: "vickie.crona@hotmail.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/2196/396/people?lock=4078758607438882",
    },
    { name: "Robin Schowalter", email: "robin_schowalter@hotmail.com", color: "blue", status: "approved" },
    {
      name: "Dianna Hills",
      email: "dianna_hills@hotmail.com",
      color: "blue",
      status: "approved",
      image: "https://loremflickr.com/2899/2288/people?lock=464033538803103",
    },
    {
      name: "Norma Nicolas",
      email: "norma.nicolas@hotmail.com",
      color: "iris",
      status: "approved",
      image: "https://loremflickr.com/943/2671/people?lock=6323057195270710",
    },
    {
      name: "Olga Jacobi IV",
      email: "olga_jacobiiv30@hotmail.com",
      color: "yellow",
      status: "approved",
      image: "https://loremflickr.com/3424/2413/people?lock=5507345131104232",
    },
    {
      name: "Barbara Hills-McGlynn",
      email: "barbara_hills-mcglynn16@gmail.com",
      color: "mint",
      status: "approved",
      image: "https://loremflickr.com/1578/3221/people?lock=3480408828176771",
    },
    {
      name: "Pedro Strosin",
      email: "pedro.strosin@yahoo.com",
      color: "iris",
      status: "approved",
      image: "https://loremflickr.com/2693/2237/people?lock=2759999692580085",
    },
    {
      name: "Tanya Ryan",
      email: "tanya_ryan18@yahoo.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/1643/3403/people?lock=5572247551980764",
    },
    { name: "Elijah Reichel", email: "elijah_reichel78@gmail.com", color: "iris", status: "approved" },
    { name: "Robert Will PhD", email: "robert.willphd@yahoo.com", color: "cyan", status: "approved" },
    { name: "Tom Ryan PhD", email: "tom_ryanphd@hotmail.com", color: "orange", status: "approved" },
    { name: "John Bergnaum", email: "john.bergnaum38@gmail.com", color: "yellow", status: "approved" },
    {
      name: "Simon Gutkowski",
      email: "simon.gutkowski54@yahoo.com",
      color: "cyan",
      status: "approved",
      image: "https://loremflickr.com/1417/3392/people?lock=7527303630882918",
    },
    {
      name: "Sergio Goyette-Langworth",
      email: "sergio_goyette-langworth29@gmail.com",
      color: "mint",
      status: "approved",
    },
    {
      name: "Opal Vandervort",
      email: "opal_vandervort@yahoo.com",
      color: "blue",
      status: "approved",
      image: "https://loremflickr.com/2013/609/people?lock=8249146218835162",
    },
    {
      name: "Laura Terry",
      email: "laura.terry70@hotmail.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/3943/2151/people?lock=6933169452101609",
    },
    {
      name: "Kristin Deckow",
      email: "kristin.deckow@gmail.com",
      color: "iris",
      status: "approved",
      image: "https://loremflickr.com/3958/1544/people?lock=2256500247879882",
    },
    {
      name: "Sean VonRueden",
      email: "sean_vonrueden22@hotmail.com",
      color: "teal",
      status: "approved",
      image: "https://loremflickr.com/2609/2503/people?lock=5756848901843228",
    },
    {
      name: "Desiree Marks-Dach",
      email: "desiree.marks-dach57@yahoo.com",
      color: "iris",
      status: "approved",
    },
    {
      name: "Rosemary Moen",
      email: "rosemary.moen@yahoo.com",
      color: "teal",
      status: "approved",
      image: "https://loremflickr.com/847/1621/people?lock=6354617192708947",
    },
    {
      name: "Jerald Beatty",
      email: "jerald.beatty64@yahoo.com",
      color: "yellow",
      status: "approved",
      image: "https://loremflickr.com/1347/3822/people?lock=8986325037826003",
    },
    { name: "Carroll Wunsch", email: "carroll.wunsch45@hotmail.com", color: "gold", status: "approved" },
    {
      name: "Lori Bailey",
      email: "lori_bailey@gmail.com",
      color: "iris",
      status: "approved",
      image: "https://loremflickr.com/2499/725/people?lock=767881499844032",
    },
    {
      name: "Mr. Edmund Turcotte",
      email: "mr._edmundturcotte@gmail.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/168/3132/people?lock=7558904588503383",
    },
    { name: "Dorothy Torphy", email: "dorothy_torphy@yahoo.com", color: "teal", status: "approved" },
    {
      name: "Rosemarie Murazik",
      email: "rosemarie_murazik@yahoo.com",
      color: "cyan",
      status: "approved",
      image: "https://loremflickr.com/1731/979/people?lock=3128617346072777",
    },
    {
      name: "Dr. Max Stark",
      email: "dr.maxstark@yahoo.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/520/2187/people?lock=7784609946044764",
    },
    { name: "Pam Monahan", email: "pam_monahan90@gmail.com", color: "mint", status: "approved" },
  ];
  const fakeUsersTwo = [
    {
      name: "Anna Sanford",
      email: "anna.sanford@yahoo.com",
      color: "blue",
      status: "pending",
      image: "https://loremflickr.com/1385/1464/people?lock=7071892914626998",
    },
    {
      name: "Ginger O'Keefe",
      email: "ginger_okeefe80@yahoo.com",
      color: "cyan",
      status: "pending",
      image: "https://loremflickr.com/2241/1926/people?lock=7918327599459055",
    },
    {
      name: "Delbert Keebler",
      email: "delbert.keebler@gmail.com",
      color: "blue",
      status: "approved",
      image: "https://loremflickr.com/2235/3905/people?lock=3257897763750766",
    },
    {
      name: "Daisy Marvin",
      email: "daisy_marvin22@yahoo.com",
      color: "cyan",
      status: "approved",
      image: "https://loremflickr.com/1481/2956/people?lock=593125255180332",
    },
    {
      name: "Alberto Schamberger",
      email: "alberto_schamberger@yahoo.com",
      color: "gold",
      status: "approved",
    },
    {
      name: "Kristine Sauer",
      email: "kristine.sauer@yahoo.com",
      color: "teal",
      status: "approved",
      image: "https://loremflickr.com/1837/2391/people?lock=3692920193269677",
    },
    {
      name: "Gerardo Paucek",
      email: "gerardo.paucek@hotmail.com",
      color: "teal",
      status: "approved",
      image: "https://loremflickr.com/2533/111/people?lock=6991506236600674",
    },
    {
      name: "Geraldine Tremblay",
      email: "geraldine.tremblay37@yahoo.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/3586/542/people?lock=724956248836519",
    },
    {
      name: "Santiago Walter",
      email: "santiago.walter12@gmail.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/1173/3525/people?lock=4440689233565039",
    },
    {
      name: "Joanne Reinger",
      email: "joanne.reinger@gmail.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/1046/2951/people?lock=6364927164443862",
    },
    {
      name: "Dr. Marshall Dickens",
      email: "dr.marshalldickens75@gmail.com",
      color: "orange",
      status: "approved",
    },
    {
      name: "Herman Macejkovic",
      email: "herman.macejkovic58@yahoo.com",
      color: "yellow",
      status: "approved",
      image: "https://loremflickr.com/402/1752/people?lock=3064773528165120",
    },
    {
      name: "Courtney Blick",
      email: "courtney.blick@hotmail.com",
      color: "cyan",
      status: "approved",
      image: "https://loremflickr.com/1431/2432/people?lock=5085935861670863",
    },
    {
      name: "Mr. Rudy Nienow",
      email: "mr._rudynienow83@gmail.com",
      color: "gold",
      status: "approved",
      image: "https://loremflickr.com/1310/908/people?lock=273462109877350",
    },
    {
      name: "Louise Hodkiewicz",
      email: "louise.hodkiewicz@hotmail.com",
      color: "teal",
      status: "approved",
      image: "https://loremflickr.com/3003/1334/people?lock=2781428320611139",
    },
    {
      name: "Betty Lowe",
      email: "betty.lowe@hotmail.com",
      color: "blue",
      status: "approved",
      image: "https://loremflickr.com/885/1726/people?lock=8596941960537848",
    },
    { name: "Cynthia Von", email: "cynthia.von@yahoo.com", color: "blue", status: "approved" },
    { name: "Ms. Sherry Marks", email: "ms.sherrymarks94@yahoo.com", color: "blue", status: "approved" },
    {
      name: "Ignacio Cassin",
      email: "ignacio.cassin@hotmail.com",
      color: "teal",
      status: "approved",
      image: "https://loremflickr.com/3004/196/people?lock=6873140577248646",
    },
    {
      name: "Mr. Mike Brown",
      email: "mr.mikebrown98@gmail.com",
      color: "gold",
      status: "approved",
      image: "https://loremflickr.com/1677/1752/people?lock=6114314267333156",
    },
    {
      name: "Ramona Volkman",
      email: "ramona.volkman68@hotmail.com",
      color: "yellow",
      status: "approved",
      image: "https://loremflickr.com/2860/1494/people?lock=2389388450543744",
    },
    {
      name: "Wilma Connelly",
      email: "wilma_connelly@yahoo.com",
      color: "yellow",
      status: "approved",
      image: "https://loremflickr.com/433/322/people?lock=4894920631599286",
    },
    {
      name: "Cameron Mosciski",
      email: "cameron_mosciski49@yahoo.com",
      color: "yellow",
      status: "approved",
      image: "https://loremflickr.com/494/2498/people?lock=2527764839264567",
    },
    {
      name: "Janet Carter-Witting",
      email: "janet_carter-witting90@yahoo.com",
      color: "orange",
      status: "approved",
      image: "https://loremflickr.com/448/1529/people?lock=2145410501651754",
    },
    {
      name: "Margaret Dickinson",
      email: "margaret_dickinson@gmail.com",
      color: "mint",
      status: "approved",
      image: "https://loremflickr.com/758/3616/people?lock=2591270075375956",
    },
    { name: "Kenneth Willms", email: "kenneth_willms13@yahoo.com", color: "orange", status: "approved" },
    { name: "Pat Hirthe", email: "pat_hirthe73@hotmail.com", color: "teal", status: "approved" },
    { name: "Randolph Weimann", email: "randolph.weimann@hotmail.com", color: "cyan", status: "approved" },
    {
      name: "Clay Boyle",
      email: "clay.boyle@hotmail.com",
      color: "yellow",
      status: "approved",
      image: "https://loremflickr.com/3932/1716/people?lock=5612722572100443",
    },
    { name: "Shawn Baumbach", email: "shawn.baumbach58@hotmail.com", color: "gold", status: "approved" },
    { name: "June Abernathy", email: "june.abernathy@gmail.com", color: "teal", status: "approved" },
  ];

  const sortedFakeUsers = fakeUsers
    // .map((user) => ({
    //   ...user,
    //   image: !user.name.includes("h") ? faker.image.urlLoremFlickr({ category: "people" }) : undefined,
    // }))
    .sort((a, b) => {
      // pending first
      return a.status === "pending" ? -1 : 1;
    }) as any;
  const sortedFakeUsersTwo = fakeUsersTwo
    // .map((user) => ({
    //   ...user,
    //   image: !user.name.includes("h") ? faker.image.urlLoremFlickr({ category: "people" }) : undefined,
    // }))
    .sort((a, b) => {
      // pending first
      return a.status === "pending" ? -1 : 1;
    }) as any;

  console.log("*********************** fakeUsers", JSON.stringify(sortedFakeUsers));
  console.log("*********************** fakeUsersTwo", JSON.stringify(sortedFakeUsersTwo));
  return (
    <UserContextProvider
      session={session}
      attending={attending}
      fakeUserOne={sortedFakeUsers}
      fakeUserTwo={sortedFakeUsersTwo}>
      <MyEventsProvider events={events}>{children}</MyEventsProvider>
    </UserContextProvider>
  );
}

function randomRadixColor() {
  const colors = [
    "gold",
    "blue",
    "iris",
    "orange",
    "lime",
    "cyan",
    "teal",
    "yellow",
    "orange",
    "mint",
  ] as const;

  return colors[Math.floor(Math.random() * colors.length)];
}
