import Sound from 'react-native-sound';
export const playAudio = (name)=>{   
    let sound = new Sound(name, Sound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('failed to load the sound', e);
        return;
    }
    
      // Play the sound with an onEnd callback
    sound.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  })

  return sound;
}