interface ComponentNameProps {
  tag: string
}

const ProjectsTags = ({ tag }: ComponentNameProps): React.JSX.Element => {
  return (
    <>
      <span className="text-sm md:text-base text-[#8F721E] uppercase tracking-[0.15em]">
        {tag}
      </span>
    </>
  )
}

export default ProjectsTags