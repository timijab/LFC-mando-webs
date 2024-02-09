// in this component we design a radio player.
import { checkmate } from './background';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';

const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&:before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&:after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export function MusicPlayerSlider(props) {  
 
  const audioRef = React.useRef();
  const simulateClick = React.useRef();

  const [presentVolume, setVolume] = React.useState([]);
  const [curvolume, newsetvolume] = React.useState(0.5);



  const theme = useTheme();
  

  const [position, setPosition] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [currentduration, setDuration] = React.useState(0);
  // checkmate comes from the component background to tell us when the user has clicked on an audio to play
  if (checkmate !== true){
    
  }

  var duration = currentduration;
 
  function Play(){
      
      audioRef.current.play().then(function(){
        setDuration(audioRef.current.duration);
      });
      audioRef.current.volume = curvolume;
  }
  
  function Pause(){
    var playpromise = audioRef.current.play();
    if (playpromise !== undefined){
      playpromise.then(()=>{
        audioRef.current.pause();
      }).catch((error) =>{
        console.log(error);
      })

    }
    // audioRef.current.pause();
  }
  // activate if subicon play is clicked
 

  function AutoVolume(click){
    // user clicks highest or lowest volume.
    if(click ==='mute'){
      audioRef.current.volume = 0;
    }else if(click ==='highest'){
      audioRef.current.volume = 1;
    }

  }
  function AudioVolume(){
    // audioRef.current.volume = presentVolume;
    var present = presentVolume.length - 1; 
    var last = presentVolume.length - 2;
    console.log(presentVolume);

    if (presentVolume[present] > presentVolume[last]) {
      console.log('Increase');
      newsetvolume((PreviousValue) => {
        // Ensure the volume doesn't go above 1
        const newVolume = Math.min(1, PreviousValue + 0.1);
        audioRef.current.volume = newVolume;
        return newVolume;
      });
    }else if (presentVolume[present] < presentVolume[last]) {
      console.log('Decrease');
      newsetvolume((PreviousValue) => {
        // Ensure the volume doesn't go below 0
        const newVolume = Math.max(0.1, PreviousValue - 0.1);
        audioRef.current.volume = newVolume;
        return newVolume;
      });
    }else{
      console.log(undefined);
    }

  }  

  React.useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setPosition(audioRef.current.currentTime);
      }
    };
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  function getLeftValue() {
    var butt = document.querySelector('.MuiSlider-thumbSizeMedium');
    var computedStyle = window.getComputedStyle(butt);
    var leftp = computedStyle.getPropertyValue('left').replace('px','');
    // errror the ref is on the worng element, please change
    // get parent container width.
    // const offsetParentWidth = computedStyle.offsetParent.clientWidth;
    const offsetParentWidth = document.querySelector('.css-1ftckkc-MuiStack-root').offsetWidth;
  // Convert the 'left' value to a percentage
    const leftPercentage = (leftp / offsetParentWidth) * 100;
    setVolume((PreviousValue)=>{
      // using set to remove the duplicates
      const updatedArray = [...new Set([...PreviousValue, Math.ceil(leftPercentage)])];
      return  updatedArray;
    });
    AudioVolume();
  }
  function formatDuration(value) {
    const minute = Math.floor(value / 60);

    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <audio ref={audioRef} src={'https://drive.google.com/uc? export=download&id='+props.audioid} type='audio/mpeg'>
            </audio>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CoverImage>
            <img
              alt="Sunday"
              src="../images/lfc_logo-removebg-preview.png"
            />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                {/* we change from now listening to paused */}
              Now listening..
            </Typography>
            <Typography noWrap>
                {/* teaching topic */}
              <b> {props.title} *</b>
            </Typography>
            {/* Minister name */}
            <Typography noWrap letterSpacing={-0.25}>
              {props.speaker}
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value)}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position).slice(0, formatDuration(position).lastIndexOf('.'))}</TinyText>
          <TinyText>-{formatDuration(duration - position).slice(0, formatDuration(duration - position).lastIndexOf('.'))}</TinyText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={()=>{setPaused(!paused); 
              }}>
            {paused ? (
              <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} onClick={()=>{Pause();console.log('pause')}}/>
              
            ) : (
              <PlayArrowRounded
              sx={{ fontSize: '3rem' }}
              htmlColor={mainIconColor}
              onClick={() =>{Play();}} 
              ref={simulateClick}
            />

            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </Box>
        <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
          <VolumeDownRounded htmlColor={lightIconColor} 
          onClick={
            ()=>{
              AutoVolume('mute');
            }
          }
          />
          <Slider
            aria-label="Volume"
            defaultValue={50}
            onTransitionEnd={getLeftValue}
            sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                backgroundColor: '#fff',
                '&:before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} 
            onClick={
              ()=>{
                AutoVolume('highest');
              }
            }
          />
        </Stack>
      </Widget>
      
      <WallPaper />
    </Box>
  );
}

export function trigger(){
  console.log('I work you are a genius');
}
