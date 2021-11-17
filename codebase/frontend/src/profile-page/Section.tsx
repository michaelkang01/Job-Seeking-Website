/**
 *
 * @param props SectionRequirements to specify some useful styling
 * @returns JSX.Element content to be displayed
 */
const Section = (props) => {
  return (
    <div className="relative mb-16 border-2 border-gray-100 grid shadow-xl">
      <div className="bg-tiffany-blue opacity-75 w-full py-2 pl-4 text-white text-2xl">
        {props.name}
      </div>
      <div className="p-4">{props.content}</div>
    </div>
  );
};

export default Section;
