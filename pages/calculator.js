import { useState } from "react"
import {PageSEO} from "@/components/SEO"

function createPricingEntry({
  key = 0,
  costcenter = '',
  currency = '',
  price = '',
  unit = '',
  description = '',
  comment = '',
  active = true,
  id = '',
} = {}) {
  return {
    key,
    costcenter,
    currency,
    price,
    unit,
    description,
    comment,
    active,
    id,
  }
}

const pricingEntries = [
  createPricingEntry({
    key: 1,
    costcenter: 'engineer',
    currency: 'USD',
    price: 100,
    unit: 'hour',
    description: 'ML Engineer',
    comment: 'ML Engineer',
    active: true,
    id: 'engineer',
  }),
  createPricingEntry({
    key: 2,
    costcenter: 'infrastructure',
    currency: 'USD',
    price: 100,
    unit: 'hour',
    description: 'GPU Compute Engine',
    comment: 'GPU Compute Engine',
    active: true,
    id: 'infrastructure',
  }),
]

export default function Calculator() {
  const time = new Date().toLocaleDateString()
  const source_infra = "https://aws.amazon.com/sagemaker/pricing/"
  const source_levels = "https://levels.fyi"


  const [project_duration, setDuration] = useState()
  const [num_compute_instances, setInstances] = useState(0)
  const [num_engineers, setEngineers] = useState(0)

  const handleDurationInput = (e) => {
    setDuration(e.target.value)
  }

  return (
    <>
      <PageSEO title="ML Cost Calculator" description="Just for fun calculator for ML operational costs"/>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl">Machine Learning Cost Calculator</h1>
        <div id="market-prices" className="">
          <h2 className="text-lg font-bold">Market Prices as of {time} according to <a className="underline hover:text-sky-500" href={source_infra}>AWS</a> and <a className="underline hover:text-sky-500" href={source_levels}>Levels.fyi</a></h2>
          <ul>
            {pricingEntries.map((entry, key) => (
              <li key={key}>
                {entry.description + ": " + entry.price + " " + entry.currency + "/" + entry.unit}
              </li>
            ))}
          </ul>
        </div>
        <div id="projected-costs" className="">
          <h2 className="text-lg font-bold">Projected Costs</h2>
          <div className="flex my-2 items-center">
            Over the span of &nbsp; <input onChange={(e) => handleDurationInput(e)} value={project_duration} type="number" placeholder={69} className="dark:text-white bg-transparent rounded-md flex border border-blue-200 px-2 h-10"></input> &nbsp;
            <select name="timeunit" id="timeunit" className="bg-transparent rounded-md">
              <option value="days">days</option>
              <option value="months">months</option>
              <option value="years">years</option>
            </select>
          </div>
          <ul>
            {pricingEntries.map((entry, key) => (
              <li key={key}>
                {entry.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
