import { Router } from 'express'
import { sequelize } from '../data/databases'

const router = Router()

/*
 * INTENTIONALLY VULNERABLE
 * FOR SAST TESTING ONLY
 */

router.get('/vulnerable-search', async (req, res) => {
  try {
    const email = req.query.email as string

    // SQL Injection vulnerability
    const query =
      "SELECT * FROM Users WHERE email = '" + email + "'"

    const result = await sequelize.query(query)

    res.json(result)
  } catch (err) {
    res.status(500).json({
      error: 'query failed',
      details: err
    })
  }
})

export default router
