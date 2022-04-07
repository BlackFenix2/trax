import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  ButtonGroup,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  IconButton,
} from "@chakra-ui/react";

import ReactHowler from "react-howler";

import {
  MdShuffle,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
  MdSkipPrevious,
} from "react-icons/md";

import { useStoreActions } from "easy-peasy";
import { SongModel } from "src/lib/prisma";
import { formatTime } from "src/lib/formatters";

type Props = {
  songs: SongModel[];
  activeSong: SongModel;
};

const Player = ({ songs, activeSong }: Props) => {
  const [playing, setPlaying] = useState(true);

  const [index, setIndex] = useState(
    songs.findIndex((song) => song.id === activeSong.id)
  );

  const [seek, setSeek] = useState(0.0);

  const [isSeeking, setIsSeeking] = useState(false);

  const [repeat, setRepeat] = useState(false);

  const [shuffle, setShuffle] = useState(false);

  const [duration, setDuration] = useState(0);

  const soundRef = useRef(null);

  const repeatRef = useRef(repeat);

  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  useEffect(() => {
    let timerId: number = 0;
    // pause if the song is not playing and not currently seeking
    if (playing && !isSeeking) {
      // set off after 1 tick
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      // kick off animation frame
      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
  }, [playing, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  // fix closure issue with react-howler and repeat state ref
  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayState = (value: boolean) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  const prevSong = () => {
    setIndex((state) => (state ? state - 1 : songs.length - 1));
  };

  const nextSong = () => {
    setIndex((state: any) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          return nextSong();
        }
        return next;
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeat) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (event: any) => {
    setSeek(parseFloat(event[0]));
    soundRef.current.seek(event[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
          onSeek={onSeek}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            color={shuffle ? "white" : "gray.500"}
            onClick={onShuffle}
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="skip previous"
            fontSize="24px"
            onClick={prevSong}
            icon={<MdSkipPrevious />}
          />
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}

          <IconButton
            outline="none"
            variant="link"
            aria-label="skip next"
            fontSize="24px"
            onClick={nextSong}
            icon={<MdSkipNext />}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            color={repeat ? "white" : "gray.500"}
            onClick={onRepeat}
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              // aria-label prop for RangeSLider conflicts with jsx-a11y/aria-proptypes linting rule
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
