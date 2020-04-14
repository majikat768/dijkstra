class Log { 
  constructor({ say }) { 
    this.props = {
      say: say
    }
  }

  do(msg) {
    this.props.say(msg)
    console.log(msg)
  }
}
