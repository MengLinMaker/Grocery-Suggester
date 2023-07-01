'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './GroceryCard.module.css'
import NutrientSlider from './NutrientSlider'
import { motion, AnimatePresence } from "framer-motion"

const GroceryCard = ({productInfo}:any) => {
  const [clicked, setClicked] = useState(false)

  let imageSize = clicked ? '9rem' : '4.5rem'


  let productName = productInfo.name
  const maxLength = 50;
  if (productName.length > maxLength) {
    productName = productName.slice(0, maxLength - 3) + '...'
  }

  return (
    <div className={styles.card}
      onClick={() => setClicked(!clicked)}
      onAbort={() => setClicked(false)}
    >
      <div className='flex'>
        <a>
            <motion.div
              className={styles.imageContainer}
              animate={{ height: imageSize, width: imageSize }}
              transition={{ type: 'tween', duration: 0.1 }}
            >
              <div className={styles.imagePadding}>
                <Image
                  className={styles.imagePadding}
                  src={productInfo.img}
                  fill={true}
                  style={{objectFit: 'cover'}}
                  alt={productInfo.name}
                />
              </div>
            </motion.div>
        </a>
        <div className={styles.textContainer}>
          <p>{productName}</p>
          <div className={styles.priceContainer}>
            <h6>{`${productInfo.unitPrice} $/kg`}</h6>
            <p style={{marginLeft: '1rem', textAlign: 'right'}}>{`$${productInfo.price} / ${productInfo.quantity}kg`}</p>
          </div>
        </div>
      </div>
      <AnimatePresence>
      { clicked &&
        <motion.div
          className={styles.infoContainer}
          initial={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
          animate={{ opacity: 1, height: 'auto', paddingTop: '1rem', paddingBottom: '1rem' }}
          exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
          transition={{ type: 'tween', duration: 0.1}}
        >
          { productInfo.nutrition &&
            Object.getOwnPropertyNames(productInfo.nutrition).map((nutrition:Object, id:number) => {
              const nutrient = nutrition as keyof Object
              return (
                <NutrientSlider
                  key={id}
                  nutrient={nutrient}
                  value={productInfo.nutrition[nutrient]}
                  rdi={100}
                />
              )
            })
          }
          { !productInfo.nutrition &&
            <span><p className='center-text italic-text'>Nutrition info available</p></span>
          }
        </motion.div>
      }
    </AnimatePresence>
    </div>
  )
}

export default GroceryCard