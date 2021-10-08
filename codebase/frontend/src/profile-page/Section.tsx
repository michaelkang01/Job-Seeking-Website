type SectionRequirements = {
  name: string,
  centerheader?: boolean,
  content: any
}
const Section = (props: SectionRequirements) => {

  return (
    <div className="relative rounded-3xl mb-16 grid shadow-xl">
      <div className={`flex relative rounded-t-3xl bg-green-600 w-full h-20 items-center ${props.centerheader ? "justify-center" : ""}`}>
        <p className="text-white font-semibold text-2xl my-0 ml-4">{props.name}</p>
      </div>
      {props.content}
    </div>
  );
};

export default Section;
