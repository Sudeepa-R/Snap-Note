import Footer from "./Footer/Footer"

const About = () => {
  return (
    <>
      <div className="text-white">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexDirection: 'column', gap: '20px',marginBottom : '10rem' }}>
          <div className="">
            <h2>About our Snap-Note</h2>
            <p>
              This App is a simple and effective tool to help you organize and
              manage your daily tasks efficiently. Whether you are a student,
              professional, or anyone with a busy schedule, this app is designed to make
              your life easier.
            </p>
          </div>
          <div className="">
            <h3>Why do we need this?</h3>
            <p>
              In today's fast-paced world, staying organized is crucial. Our Snap-Note App
              allows you to create, prioritize, and track your tasks, ensuring that
              nothing important is overlooked.
            </p>
          </div>
          <div className="">
            <h3>How it works</h3>
            <p>
              1. Add your tasks: Simply add the tasks you need to accomplish today, this
              week, or anytime in the future.
              <br />
              2. Prioritize: Organize your tasks by setting priorities to focus on what
              matters most.
              <br />
              3. Manage Task: You can manage task. like delete and update.
            </p>
          </div>
        </div>
        <Footer />

      </div>
    </>
  )
}

export default About
