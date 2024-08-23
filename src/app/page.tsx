import Image from "next/image"
import styles from "./page.module.css"

const episodesPerSeason: Record<number, number> = {
  1: 13,
  2: 13,
  3: 13,
}

export default function Home() {
  interface PaintingProps {
    season: number
    episode: number
  }

  const Painting = (props: PaintingProps) => {
    return (
      <Image
        src={`/paintings/bobross_season_${props.season}_episode_${props.episode}.png`}
        alt={`Painting - Season ${props.season} Episode ${props.episode}`}
        width={250}
        height={180}
      />
    )
  }

  type PaintingNumber = {
    season: number
    episode: number
  }

  interface PaintingRowProps {
    images: PaintingNumber[]
  }

  const PaintingRow = (props: PaintingRowProps) => {
    return (
      <div className={styles.row}>
        <div className={styles.grid}>
          {props.images.map((image, i) => {
            return <Painting season={image.season} episode={image.episode} key={i} />
          })}
        </div>
      </div>
    )
  }

  interface PaintingSeasonProps {
    season: number
  }

  const PaintingSeason = (props: PaintingSeasonProps) => {
    const NUM_PER_ROW = 4
    return [...Array(Math.ceil(episodesPerSeason[props.season] / NUM_PER_ROW))].map((_, i) => {
      const imagesPerRow =
        (i + 1) * NUM_PER_ROW > episodesPerSeason[props.season]
          ? NUM_PER_ROW + (episodesPerSeason[props.season] - (i + 1) * NUM_PER_ROW)
          : NUM_PER_ROW

      const images = [...Array(imagesPerRow)].map((_, j) => {
        return { season: props.season, episode: i * NUM_PER_ROW + 1 + j }
      })

      return <PaintingRow images={images} key={i} />
    })
  }

  interface SeasonsProps {
    seasons: number
  }

  const Seasons = (props: SeasonsProps) => {
    return [...Array(props.seasons)].map((_, i) => {
      return <PaintingSeason season={i + 1} key={i} />
    })
  }

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Seasons seasons={Object.keys(episodesPerSeason).length} />
      </div>
    </main>
  )
}
